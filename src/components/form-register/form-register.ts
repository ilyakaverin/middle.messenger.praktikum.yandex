import { Block } from "../../services/block";
import template from "./index.pug";
import { Button } from "../button/button";
import { Input } from "../text-input";
import { collectData } from "../../utils";
import {
  emailValidationScheme,
  loginValidationScheme,
  nameValidationScheme,
  passwordValidationScheme,
  phoneValidationScheme,
} from "../../utils/validation";

interface FormRegisterProps {
  type?: string;
  label: string;
  classNames?: string[];
  events?: {
    click: (e: Event) => void;
  };
}

export class FormRegister extends Block<FormRegisterProps> {
  constructor(props: FormRegisterProps) {
    super({ ...props });
  }

  init() {
    this.children.button1 = new Button({
      label: "Create profile",
      classNames: ["button", "green"],
      events: {
        click: (e: Event) => {
          e.preventDefault();
          collectData("formRegister");
        },
      },
    });
    this.children.button2 = new Button({
      label: "Back to login",
      classNames: ["button", "purple"],
    });
    this.children.login = new Input({
      type: "text",
      className: ["text-input"],
      placeholder: "Login",
      name: "login",
      events: {
        blur: (e: Event) => {
          const inputEl = e.target as HTMLInputElement;
          loginValidationScheme(inputEl.value);
        },
      },
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
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
