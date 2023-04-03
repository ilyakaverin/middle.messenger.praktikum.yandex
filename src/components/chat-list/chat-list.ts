import { Block } from "../../services/block";
import template from "./index.pug";
import * as styles from "./chat-list.module.scss";
import { ChatSearch } from "../chat-search/chat-search";
import { Button } from "../button/button";

interface ChatListProps {
  events?: {
    click: () => void;
  };
}

export class ChatList extends Block<ChatListProps> {
  constructor(props: ChatListProps) {
    super({ ...props });
  }

  init() {
    this.children.chat_search = new ChatSearch({});
    this.children.button1 = new Button({
      label: "logout",
      classNames: ["button", "purple", "fullWidth"],
    });
    this.children.button2 = new Button({
      label: "Edit profile",
      classNames: ["button", "green", "fullWidth"],
    });
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
