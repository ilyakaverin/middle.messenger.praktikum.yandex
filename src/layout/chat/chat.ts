import { ChatInput } from "../../components/chat-input/chat-input";
import { ChatList } from "../../components/chat-list/chat-list";
import { ChatMessages } from "../../components/chat-messages/chat-messages";
import { Block } from "../../services/block";
import template from "./index.pug";

export class Chat extends Block {
  constructor(props: any) {
    super({ ...props });
  }

  init() {
    this.children.chat_list = new ChatList({});
    this.children.chat_messages = new ChatMessages({});
    this.children.chat_input = new ChatInput({});
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
