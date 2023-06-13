import { Block } from "../../services/block";
import template from "./index.pug";
import { Button } from "../button/button";
import { Input } from "../text-input";
import { collectData } from "../../utils";
import router from "../../services/router";
import { routes } from "../../interfaces/enums";
import {
  confirmValidationScheme,
  passwordValidationScheme,
} from "../../utils/validation";
import { FormLoginProps } from "../../interfaces/components";
import { changePassword } from "../../sources/user";
import { isLogged } from "../../sources/constants";

export class FormChangePassword extends Block<FormLoginProps> {
  constructor(props: FormLoginProps) {
    super({ ...props });
  }

  private errors: any = {};

  init() {

    if (!isLogged()) {
      setTimeout(() => router.go(routes.login), 150);
    }
    
    this.children.button1 = new Button({
      label: "Save and exit",
      classNames: ["button", "green"],
      disabled: true,
      events: {
        click: async (e) => {
          e.preventDefault();

          const { old_password, new_password } =
            collectData("formChangePassword");

          const requestParameters = {
            oldPassword: old_password,
            newPassword: new_password,
          };

          try {
            this.loader("loading", true);

            const response = (await changePassword(
              requestParameters
            )) as XMLHttpRequest;

            console.log(response);

            if (response.status !== 200) {
              throw new Error(response.responseText);
            }

            router.go(routes.edit);
          } catch (e) {
            this.loader("Save and exit", false);
            new Notification(e);
          }
        },
      },
    });
    this.children.button2 = new Button({
      label: "Back to edit",
      classNames: ["button", "purple"],
      events: {
        click: () => {
          router.go(routes.edit);
        },
      },
    });
    this.children.old_password = new Input({
      type: "password",
      classNames: ["text-input"],
      placeholder: "Old password",
      name: "old_password",
      events: {
        input: () => {
          this.checkIsFormFilledAndValid();
        },
      },
    });
    this.children.new_password = new Input({
      type: "password",
      classNames: ["text-input"],
      placeholder: "New password",
      name: "new_password",
      events: {
        blur: (e: Event) => {
          const inputEl = e.target as HTMLInputElement;
          this.errors.new_password = passwordValidationScheme(inputEl.value);

          this.errorNotify(this.errors.new_password);
        },
        input: () => {
          this.checkIsFormFilledAndValid();
        },
      },
    });
    this.children.confirm_password = new Input({
      type: "password",
      classNames: ["text-input"],
      placeholder: "Confirm password",
      name: "confirm_password",
      events: {
        blur: () => {
          this.errorNotify(this.errors.confirm_password);
        },
        input: (e: Event) => {
          const newPassword = this.children.new_password.getValue();
          this.errors.confirm_password = confirmValidationScheme(
            e.target.value,
            newPassword
          );
          this.checkIsFormFilledAndValid();
        },
      },
    });
  }

  checkIsFormFilledAndValid() {
    const button = this.children.button1 as Button;
    const formData = collectData("formChangePassword");
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

  errorNotify(field: string[] | undefined) {
    if (field && field.length > 0) {
      new Notification(field);
    }
  }

  loader(text: string, disabled: boolean) {
    const button = this.children.button1 as Button;
    button.setProps({ label: text, disabled });
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
