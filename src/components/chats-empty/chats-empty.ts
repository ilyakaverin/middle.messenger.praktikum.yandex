import { Block } from "../../services/block";
import template from "./index.pug";

interface EmptyChatsProps {
  text: string;
}
export class EmptyChats extends Block {
  constructor(props: EmptyChatsProps) {
    super({ type: "span", ...props });
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
