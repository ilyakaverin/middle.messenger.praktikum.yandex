import { InputProps } from "../../interfaces/components";
import { Block } from "../../services/block";
import template from "./index.pug";

export class Input extends Block<InputProps> {
  constructor(props: InputProps) {
    super({ type: "text", ...props });
  }

  getValue() {
    return (this.element! as HTMLInputElement).value;
  }

  setValue(data: string) {
    (this.element! as HTMLInputElement).value = data;
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
