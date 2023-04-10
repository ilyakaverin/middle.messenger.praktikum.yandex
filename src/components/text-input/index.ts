import { Block } from "../../services/block";
import template from "./index.pug";
import * as styles from "./text-input.module.scss";

interface InputProps {
  type?: string;
  className: string[];
  placeholder: string;
  events?: {
    click?: () => void;
    focus?: () => void;
    blur?: (e: Event) => void;
  };
  name: string;
}

export class Input extends Block<InputProps> {
  constructor(props: InputProps) {
    super({ type: "text", ...props });

    props.className.forEach((prop) => {
      this.element!.classList.add(
        (styles as unknown as Record<string, string>)[prop]
      );
    });
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
