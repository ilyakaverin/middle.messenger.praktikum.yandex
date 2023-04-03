import { Block } from "../../services/block";
import template from "./index.pug";
import * as styles from "./chat-search.module.scss";
import { Input } from "../text-input";

interface ChatSearchProps {}

export class ChatSearch extends Block<ChatSearchProps> {
  constructor(props: ChatSearchProps) {
    super({ ...props });
  }

  init() {
    this.children.input = new Input({
      type: "text",
      placeholder: "Chat search",
      name: "chat_search",
      className: ["text-input", "chatlist-input"],
    });
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
