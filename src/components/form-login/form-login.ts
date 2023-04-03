import { Block } from "../../services/block";
import template from "./index.pug";
import { Button } from "../button/button";
import { Input } from "../text-input";
import { collectData } from "../../utils";
import {
  loginValidationScheme,
  passwordValidationScheme,
} from "../../utils/validation";

interface FormLoginProps {
  type?: string;
  label: string;
  classNames?: string[];
  events?: {
    submit: () => void;
  };
}

type HTMLElementEvent<T extends HTMLElement> = Event & {
  target: T;
};

export class FormLogin extends Block<FormLoginProps> {
  constructor(props: FormLoginProps) {
    super({ ...props });
  }

  init() {
    this.children.buttonLogin = new Button({
      type: "submit",
      label: "Enter",
      classNames: ["button", "green"],
      events: {
        click: (e) => {
          e.preventDefault();
          collectData("formLogin");
        },
      },
    });
    this.children.buttonRegister = new Button({
      label: "Register",
      classNames: ["button", "purple"],
    });
    this.children.inputLogin = new Input({
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
    this.children.inputPassword = new Input({
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
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
