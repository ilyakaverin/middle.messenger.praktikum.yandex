import { Block } from "../../services/block";
import template from "./index.pug";

interface ChatMessagesProps {
  events?: {
    click: () => void;
  };
}

export class ChatMessages extends Block<ChatMessagesProps> {
  constructor(props: ChatMessagesProps) {
    super({ ...props });
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
