import { Block } from "../../services/block";
import buttonTemplate from "./index.pug";
import * as styles from "./button.module.scss";

interface ButtonProps {
  type?: string;
  label: string;
  classNames: string[];
  events?: {
    click: (e: Event) => void;
  };
}
export class Button extends Block<ButtonProps> {
  constructor(props: ButtonProps) {
    super({ type: "button", ...props });

    props.classNames.forEach((prop) => {
      this.element!.classList.add(
        (styles as unknown as Record<string, string>)[prop]
      );
    });
  }

  render() {
    return this.compile(buttonTemplate, { ...this.props, styles });
  }
}
