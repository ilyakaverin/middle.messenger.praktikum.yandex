import { Block } from "../../services/block";
import { deleteUserFromChat, getChatUsers } from "../../sources/chat";
import store from "../../store";
import { Button } from "../button/button";
import template from "./index.pug";

interface IUserProps {
  title: string;
  id: number;
  chatId: number;
  owner: number;
}

export class User extends Block {
  constructor(props: IUserProps) {
    super({ type: "button", ...props });

    if (this.props.owner === this.props.id) {
      this.children.button.setProps({
        label: "its me!",
        disabled: true,
        classNames: ["button", "green", "button-small"],
      });
    }
  }

  init() {
    this.children.button = new Button({
      label: "Delete",
      classNames: ["button", "purple", "button-small"],
      disabled: false,
      events: {
        click: async (e: Event) => {
          const request = {
            users: [this.props.id],
            chatId: this.props.chatId,
          };
          this.loader(this.children.button as Button, "Deleting", true);

          try {
            await deleteUserFromChat(request);
            const response = await getChatUsers(this.props.chatId);
            store.set("chatUsers", response.message);
          } catch (e) {
            new Notification(e);
          }
        },
      },
    });
  }

  loader(button: Button, text: string, disabled: boolean) {
    button.setProps({ label: text, disabled });
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
