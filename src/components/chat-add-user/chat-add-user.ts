import { StoreEvents } from "../../interfaces/enums";
import { Block } from "../../services/block";
import { addUser } from "../../sources/chat";
import { userSearch } from "../../sources/user";
import store from "../../store";
import { debounce, throttle } from "../../utils";
import { Button } from "../button/button";
import { Input } from "../text-input";
import template from "./index.pug";

interface IChatAdduserProps {
  label: string;
}

export class ChatAddUser extends Block {
  constructor(props: IChatAdduserProps) {
    super({ type: "div", ...props });
  }

  init() {
    this.children.inputLogin = new Input({
      type: "text",
      classNames: ["text-input"],
      placeholder: "search user",
      name: "search_user",
      autocomplete: "off",
      events: {
        input: debounce(this.handleInput, 2000),
      },
    });
    this.children.addUser = new Button({
      label: "Add",
      classNames: ["button", "green"],
      events: {
        click: async () => {
          const userId = this.props.users[0].id;

          const request = {
            users: [userId],
            chatId: this.props.chatId,
          };

          await addUser(request);
        },
      },
    });
    this.children.closeButton = new Button({
      label: "Close",
      classNames: ["button", "purple"],
      events: {
        click: () => {
          // todo подумать как анмаунтить компонент
          const element = document.querySelector(".chat-add-user");
          element?.remove();
        },
      },
    });

    store.on(StoreEvents.Updated, () => {
      const { searchResult, currentChat } = store.getState();

      if (searchResult) {
        this.setProps({ users: searchResult, chatId: currentChat });
      }
    });
  }

  async handleInput(e: Event) {
    const response = await userSearch({ login: e.target.value });

    store.set("searchResult", response.message);
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
