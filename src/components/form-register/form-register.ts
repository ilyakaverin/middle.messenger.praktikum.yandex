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
import router from "../../services/router";
import { signup } from "../../sources/auth";
import { routes } from "../../interfaces/enums";
import { isLogged } from "../../sources/constants";

interface FormRegisterProps {
  type?: string;
  label: string;
  classNames?: string[];
  events?: {
    click: (e: Event) => void;
  };
}

export class FormRegister extends Block<FormRegisterProps> {
  private errors: Record<string, string[] | undefined> = {};

  constructor(props: FormRegisterProps) {
    super({ ...props });
  }

  init() {
    if (isLogged()) {
      setTimeout(() => router.go(routes.login), 150);
    }

    this.children.button1 = new Button({
      label: "Create profile",
      classNames: ["button", "green"],
      disabled: true,
      events: {
        click: async (e: Event) => {
          e.preventDefault();

          const data = collectData("formRegister");

          try {
            this.loader("loading", true);
            const response = await signup(data);

            if (response.code !== 200) {
              throw new Error(response.message.reason);
            }

            localStorage.setItem("id", JSON.stringify(response.message));

            router.go(routes.chat);
          } catch (e) {
            this.loader("Create profile", false);
            new Notification(e);
          }
        },
      },
    });
    this.children.button2 = new Button({
      label: "Back to login",
      classNames: ["button", "purple"],
      events: {
        click: () => {
          router.go(routes.login);
        },
      },
    });
    this.children.login = new Input({
      type: "text",
      classNames: ["text-input"],
      placeholder: "Login",
      name: "login",
      events: {
        blur: (e: Event) => {
          const inputEl = e.target as HTMLInputElement;
          this.errors.login = loginValidationScheme(inputEl.value);

          if (this.errors.login && this.errors.login.length > 0) {
            new Notification(this.errors.login);
          }

          this.checkIsFormFilledAndValid();
        },
      },
    });
    this.children.password = new Input({
      type: "password",
      classNames: ["text-input"],
      placeholder: "Password",
      name: "password",
      events: {
        blur: (e: Event) => {
          const inputEl = e.target as HTMLInputElement;
          this.errors.password = passwordValidationScheme(inputEl.value);

          if (this.errors.password && this.errors.password.length > 0) {
            new Notification(this.errors.password);
          }

          this.checkIsFormFilledAndValid();
        },
      },
    });
    this.children.name = new Input({
      type: "text",
      classNames: ["text-input"],
      placeholder: "Name",
      name: "first_name",
      events: {
        blur: (e: Event) => {
          const inputEl = e.target as HTMLInputElement;
          this.errors.name = nameValidationScheme(inputEl.value);

          if (this.errors.name && this.errors.name.length > 0) {
            new Notification(this.errors.name);
          }

          this.checkIsFormFilledAndValid();
        },
      },
    });
    this.children.surname = new Input({
      type: "text",
      classNames: ["text-input"],
      placeholder: "Surname",
      name: "second_name",
      events: {
        blur: (e: Event) => {
          const inputEl = e.target as HTMLInputElement;
          this.errors.surname = nameValidationScheme(inputEl.value);

          if (this.errors.surname && this.errors.surname.length > 0) {
            new Notification(this.errors.surname);
          }

          this.checkIsFormFilledAndValid();
        },
      },
    });
    this.children.email = new Input({
      type: "email",
      classNames: ["text-input"],
      placeholder: "e-mail",
      name: "email",
      events: {
        blur: (e: Event) => {
          const inputEl = e.target as HTMLInputElement;
          this.errors.email = emailValidationScheme(inputEl.value);

          if (this.errors.email && this.errors.email.length > 0) {
            new Notification(this.errors.email);
          }
          this.checkIsFormFilledAndValid();
        },
      },
    });
    this.children.phone = new Input({
      type: "text",
      classNames: ["text-input"],
      placeholder: "Phone number",
      name: "phone",
      events: {
        blur: (e: Event) => {
          const inputEl = e.target as HTMLInputElement;
          this.errors.phone = phoneValidationScheme(inputEl.value);

          if (this.errors.phone && this.errors.phone.length > 0) {
            new Notification(this.errors.phone);
          }
          this.checkIsFormFilledAndValid();
        },
      },
    });
  }

  checkIsFormFilledAndValid() {
    const button = this.children.button1 as Button;

    const allFieldsFilled = Object.values(this.errors).length === 6;
    const allFieldsValid = Object.values(this.errors).every(
      (error) => Array.isArray(error) && error.length === 0
    );

    return allFieldsFilled && allFieldsValid
      ? button.setProps({ disabled: false })
      : button.setProps({ disabled: true });
  }

  loader(text: string, disabled: boolean) {
    const button = this.children.button1 as Button;
    button.setProps({ label: text, disabled });
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
