import { Block } from "../../services/block";
import template from "./index.pug";
import * as styles from "./form-login.scss";
import { Button } from "../button/button";
import { Input } from "../text-input";
import { collectData } from "../../utils";

interface FormLoginProps {
  type?: string;
  label: string;
  classNames?: string[];
  events?: {
    submit: () => void;
  };
}

export class FormChangePassword extends Block<FormLoginProps> {
  constructor(props: FormLoginProps) {
    super({ ...props });
  }

  init() {
    this.children.button1 = new Button({
      label: "Save and exit",
      classNames: ["button", "green"],
      events: {
        click: (e) => {
          e.preventDefault();
          collectData("formChangePassword");
        },
      },
    });
    this.children.button2 = new Button({
      label: "Back to edit",
      classNames: ["button", "purple"],
    });
    this.children.old_password = new Input({
      type: "text",
      className: ["text-input"],
      placeholder: "Old password",
      name: "old_password",
    });
    this.children.new_password = new Input({
      type: "password",
      className: ["text-input"],
      placeholder: "New password",
      name: "new_password",
    });
    this.children.confirm_password = new Input({
      type: "password",
      className: ["text-input"],
      placeholder: "Confirm password",
      name: "confirm_password",
    });
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
