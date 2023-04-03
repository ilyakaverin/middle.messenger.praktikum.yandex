import { Block } from "../../services/block";
import template from "./index.pug";
import { Button } from "../button/button";
import { Input } from "../text-input";

interface ChatInputProps {}

export class ChatInput extends Block<ChatInputProps> {
  constructor(props: ChatInputProps) {
    super({ ...props });
  }

  init() {
    this.children.button = new Button({
      label: "Send",
      classNames: ["button", "green", "inactive"],
    });

    this.children.input = new Input({
      type: "text",
      className: ["text-input"],
      placeholder: "Type message here",
      name: "message",
    });
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
