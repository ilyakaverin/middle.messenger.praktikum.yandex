import { Block } from "../../services/block";
import template from "./index.pug";
interface IMessageProps {
  content: string;
  time: string;
  user: number;
}

export class Message extends Block {
  constructor(props: IMessageProps) {
    super({ type: "div", ...props });
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
