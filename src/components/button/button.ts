import { Block } from "../../services/block";
import buttonTemplate from "./index.pug";

interface ButtonProps {
  type?: string;
  label: string;
  classNames: string[];
  disabled?: boolean;
  events?: {
    click: (e: Event) => void;
  };
}
export class Button extends Block<ButtonProps> {
  constructor(props: ButtonProps) {
    super({ type: "button", ...props });
  }

  render() {
    return this.compile(buttonTemplate, { ...this.props });
  }
}
