import { Block } from "../../services/block";
import template from "./index.pug";
import { Button } from "../button/button";
import { Input } from "../text-input";
import { collectData, isValuesNotEmpty } from "../../utils";
import router from "../../services/router";
import { signin } from "../../sources/auth";
import { routes } from "../../interfaces/enums";
import { isLogged } from "../../sources/constants";
import cn from "../../utils/classnames";

interface FormLoginProps {
  label?: string;
  classNames?: string[];
  events?: {
    submit: () => void;
  };
}

export class FormLogin extends Block {
  constructor(props: FormLoginProps) {
    super({ ...props });
  }

  init() {

    if (isLogged()) {
      setTimeout(() => router.go(routes.login), 150);
    }

    this.children.buttonLogin = new Button({
      type: "submit",
      label: "Enter",
      classNames: cn(["button", "green"]),
      disabled: true,
      events: {
        click: async (e) => {
          e.preventDefault();

          const formData = collectData("formLogin");

          try {
            this.loader(this.children.buttonLogin as Button, "loading", true);
            const response = await signin(formData) as XMLHttpRequest;

            if (response.status !== 200) {
              throw new Error(JSON.parse(response.responseText).reason);
            }
            this.loader(this.children.buttonLogin as Button, "Enter", false);
            localStorage.setItem("logged", "true");
            router.go(routes.chat);
          } catch (e) {
            this.loader(this.children.buttonLogin as Button, "Enter", false);

            if (e.message === "User already in system") {
              localStorage.setItem("logged", "true");
              router.go("/messenger");
            }
            new Notification(e);
          }
        },
      },
    });
    this.children.buttonRegister = new Button({
      label: "Register",
      classNames: cn(["button", "purple"]),
      events: {
        click: () => {
          router.go(routes.register);
        },
      },
    });
    this.children.inputLogin = new Input({
      type: "text",
      classNames: "text-input",
      placeholder: "Login",
      name: "login",
      autocomplete: "off",
      events: {
        input: () => {
          this.checkIsFormFilled(
            "formLogin",
            this.children.buttonLogin as Button
          );
        },
      },
    });
    this.children.inputPassword = new Input({
      type: "password",
      classNames: "text-input",
      placeholder: "Password",
      name: "password",
      events: {
        input: () => {
          this.checkIsFormFilled(
            "formLogin",
            this.children.buttonLogin as Button
          );
        },
      },
    });
  }

  checkIsFormFilled(formId: string, button: Button) {
    const formData = collectData(formId);

    if (isValuesNotEmpty(formData)) {
      button.setProps({ disabled: false });
    } else {
      button.setProps({ disabled: true });
    }
  }

  loader(button: Button, text: string, disabled: boolean) {
    button.setProps({ label: text, disabled });
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
