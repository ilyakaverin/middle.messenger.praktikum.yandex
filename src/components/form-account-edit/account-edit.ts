import { Block } from "../../services/block";
import template from "./index.pug";
import { Button } from "../button/button";
import { Input } from "../text-input";
import { collectData } from "../../utils";
import {
  displayNameValidationScheme,
  emailValidationScheme,
  loginValidationScheme,
  nameValidationScheme,
  passwordValidationScheme,
  phoneValidationScheme,
} from "../../utils/validation";
import router from "../../services/router";
import { routes } from "../../interfaces/enums";
import { changeProfile } from "../../sources/user";
import { getUser } from "../../sources/auth";
import { editScheme, isLogged } from "../../sources/constants";

interface FormAccountEditProps {
  type?: string;
  label: string;
  classNamess?: string[];
  events?: {
    submit: () => void;
  };
}

export class FormAccountEdit extends Block<FormAccountEditProps> {
  constructor(props: FormAccountEditProps) {
    super({ ...props });
  }

  private errors: any = {};

  init() {
    
    if (!isLogged()) {
      setTimeout(() => router.go(routes.login), 150);
    }

    this.children.button1 = new Button({
      label: "Save",
      classNames: ["button", "green"],
      disabled: true,
      events: {
        click: async (e) => {
          e.preventDefault();
          const data = collectData("formAccountEdit");

          try {
            this.loader("loading", true);

            const response = await changeProfile(data);

            if (response.code !== 200) {
              throw new Error(response.message.reason);
            }

            router.go(routes.chat);
          } catch (e) {
            this.loader("Save", false);
            new Notification(e);
          }
        },
      },
    });
    this.children.button2 = new Button({
      label: "Change password",
      classNames: ["button", "purple"],
      events: {
        click: () => {
          router.go(routes.changePassword);
        },
      },
    });
    this.children.button3 = new Button({
      label: "Back to Chat",
      classNames: ["button", "purple"],
      events: {
        click: () => {
          router.go(routes.chat);
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
        },
        input: () => {
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
        },
        input: () => {
          this.checkIsFormFilledAndValid();
        },
      },
    });
    this.children.first_name = new Input({
      type: "text",
      classNames: ["text-input"],
      placeholder: "Name",
      name: "first_name",
      events: {
        blur: (e: Event) => {
          const inputEl = e.target as HTMLInputElement;
          this.errors.first_name = nameValidationScheme(inputEl.value);

          if (this.errors.first_name && this.errors.first_name.length > 0) {
            new Notification(this.errors.first_name);
          }
        },
        input: () => {
          this.checkIsFormFilledAndValid();
        },
      },
    });
    this.children.second_name = new Input({
      type: "text",
      classNames: ["text-input"],
      placeholder: "Surname",
      name: "second_name",
      events: {
        blur: (e: Event) => {
          const inputEl = e.target as HTMLInputElement;
          this.errors.second_name = nameValidationScheme(inputEl.value);

          if (this.errors.second_name && this.errors.second_name.length > 0) {
            new Notification(this.errors.second_name);
          }
        },
        input: () => {
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
        },
        input: () => {
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
        },
        input: () => {
          this.checkIsFormFilledAndValid();
        },
      },
    });
    this.children.display_name = new Input({
      type: "text",
      classNames: ["text-input"],
      placeholder: "Display name",
      name: "display_name",
      events: {
        blur: (e: Event) => {
          const inputEl = e.target as HTMLInputElement;
          this.errors.display_name = displayNameValidationScheme(inputEl.value);

          console.log(this.errors);

          if (this.errors.display_name && this.errors.display_name.length > 0) {
            new Notification(this.errors.display_name);
          }
        },
        input: () => {
          this.checkIsFormFilledAndValid();
        },
      },
    });

    getUser().then((data: XMLHttpRequest) => {
      editScheme.forEach((key) => {
        this.children[key].setValue(data[key]);
      });
    });
  }

  checkIsFormFilledAndValid() {
    const button = this.children.button1 as Button;

    const formData = collectData("formAccountEdit");
    const errors = Object.values(this.errors);

    const allFieldsFilled = Object.values(formData).every((value) => value);
    const hasErrors =
      errors.length > 0 &&
      errors.some(
        (error: string[]) => Array.isArray(error) && error.length > 0
      );

    return allFieldsFilled && !hasErrors
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
