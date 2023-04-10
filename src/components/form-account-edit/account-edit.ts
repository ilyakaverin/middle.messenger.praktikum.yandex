import { Block } from "../../services/block";
import template from "./index.pug";
import { Button } from "../button/button";
import { Input } from "../text-input";
import { collectData } from "../../utils";
import {
  emailValidationScheme,
  nameValidationScheme,
  passwordValidationScheme,
  phoneValidationScheme,
} from "../../utils/validation";

interface FormAccountEditProps {
  type?: string;
  label: string;
  classNames?: string[];
  events?: {
    submit: () => void;
  };
}

export class FormAccountEdit extends Block<FormAccountEditProps> {
  constructor(props: FormAccountEditProps) {
    super({ ...props });
  }

  init() {
    this.children.button1 = new Button({
      label: "Save",
      classNames: ["button", "green"],
      events: {
        click: (e) => {
          e.preventDefault();
          collectData("formAccountEdit");
        },
      },
    });
    this.children.button2 = new Button({
      label: "Change password",
      classNames: ["button", "purple"],
    });
    this.children.login = new Input({
      type: "text",
      className: ["text-input"],
      placeholder: "Login",
      name: "login",
    });
    this.children.password = new Input({
      type: "password",
      className: ["text-input"],
      placeholder: "Password",
      name: "password",
      events: {
        blur: (e: Event) => {
          const inputEl = e.target as HTMLInputElement;
          passwordValidationScheme(inputEl.value);
        },
      },
    });
    this.children.name = new Input({
      type: "text",
      className: ["text-input"],
      placeholder: "Name",
      name: "first_name",
      events: {
        blur: (e: Event) => {
          const inputEl = e.target as HTMLInputElement;
          nameValidationScheme(inputEl.value);
        },
      },
    });
    this.children.surname = new Input({
      type: "text",
      className: ["text-input"],
      placeholder: "Surname",
      name: "second_name",
      events: {
        blur: (e: Event) => {
          const inputEl = e.target as HTMLInputElement;
          nameValidationScheme(inputEl.value);
        },
      },
    });
    this.children.email = new Input({
      type: "email",
      className: ["text-input"],
      placeholder: "e-mail",
      name: "email",
      events: {
        blur: (e: Event) => {
          const inputEl = e.target as HTMLInputElement;
          emailValidationScheme(inputEl.value);
        },
      },
    });
    this.children.phone = new Input({
      type: "text",
      className: ["text-input"],
      placeholder: "Phone number",
      name: "phone",
      events: {
        blur: (e: Event) => {
          const inputEl = e.target as HTMLInputElement;
          phoneValidationScheme(inputEl.value);
        },
      },
    });
    this.children.display_name = new Input({
      type: "text",
      className: ["text-input"],
      placeholder: "Display name",
      name: "display_name",
    });
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
