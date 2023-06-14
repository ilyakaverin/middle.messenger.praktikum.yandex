import { ConnectStatus, StoreEvents } from "../../interfaces/enums";
import { Block } from "../../services/block";
import { addUser, getChatUsers } from "../../sources/chat";
import store from "../../store";
import { collectCheckboxValues, } from "../../utils";
import cn from "../../utils/classnames";
import { Button } from "../button/button";
import { SearchUsers } from "../chat-search/chat-search";
import { Input } from "../text-input";
import template from "./index.pug";



interface IChatAdduserProps {
  chatId: number;
}

export class ChatAddUser extends Block {
  constructor(props: IChatAdduserProps) {
    super({ type: "div", ...props });

    store.on(StoreEvents.Updated, () => {
      const state = store.getState();

      const { currentChat, searchResult, status } = state;

      this.setProps({ chatId: currentChat, users: searchResult });

      if (status === ConnectStatus.CONNECTED) {
        (this.children.addUser as Block).setProps({ disabled: false });
      } else {
        (this.children.addUser as Block).setProps({ disabled: true });
      }
    });
  }

  init() {
    this.children.input = new SearchUsers({disabled: true});

    this.children.addUser = new Button({
      label: "Add",
      classNames: cn(["button", "green"]),
      events: {
        click: async () => {
          const data = collectCheckboxValues("user", "form-add-users");

          if (data.length === 0) {
            new Notification("please pick user");
            return;
          }

          const request = {
            users: data,
            chatId: this.props.chatId,
          };

          try {
            const response = await addUser(request) as XMLHttpRequest;

            if (response.status !== 200) {
              throw new Error("Error");
            }
            const userResponse = await getChatUsers(this.props.chatId);
            store.set("chatUsers", userResponse.message);
            new Notification("Added");
            this.setProps({ users: [] });
          } catch (e) {
            new Notification(e);
          }

          ((this.children.input as ChatAddUser).children.input as Input ).setValue("");
        },
      },
    });
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
