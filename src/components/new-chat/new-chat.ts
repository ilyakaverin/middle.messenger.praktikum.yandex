import { Block } from "../../services/block";
import template from "./index.pug";
import { Button } from "../button/button";
import { Input } from "../text-input";
import { collectData } from "../../utils";
import router from "../../services/router";
import { routes } from "../../interfaces/enums";
import { newChatValidationScheme } from "../../utils/validation";
import { createChat } from "../../sources/chat";
import { isLogged } from "../../sources/constants";
import cn from '../../utils/classnames'

interface INewChat {
  [key: string]: any
}

export class NewChat extends Block<any> {
  constructor(props: INewChat) {
    super({ ...props });
  }

  private errors: any = {};

  init() {
    if (!isLogged()) {
        setTimeout(() => router.go(routes.login), 150);
    }

    this.children.createChat = new Button({
      label: "Create chat",
      classNames: cn(["button", "green"]),
      disabled: true,
      events: {
        click: async (e) => {
          e.preventDefault();

          const data = collectData("newChat");

          try {
            this.loader("loading", true);

            const response = (await createChat(data)) as XMLHttpRequest;

            if (response.status !== 200) {
              throw new Error(response.responseText);
            }

            router.go(routes.chat);
          } catch (e) {
            this.loader("Create chat", false);
            new Notification(e);
          }
        },
      },
    });
    this.children.backToMessenger = new Button({
      label: "Back to Messenger",
      classNames: cn(["button", "purple"]),
      events: {
        click: () => {
          router.go(routes.chat);
        },
      },
    });
    this.children.newChatInput = new Input({
      type: "text",
      classNames: "text-input",
      placeholder: "Chat name",
      name: "title",
      events: {
        input: (e: Event) => {
          const inputEl = e.target as HTMLInputElement;
          this.errors.newChatInput = newChatValidationScheme(inputEl.value);
          this.errorNotify(this.errors.newChatInput);
          this.checkIsFormFilledAndValid();
        },
      },
    });
  }

  checkIsFormFilledAndValid() {
    const button = this.children.createChat as Button;
    const formData = collectData("newChat");
    const errors = Object.values(this.errors);
    console.log(errors, "fi");
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
      //@ts-ignore Notification accepts arrays
      new Notification(field);
    }
  }

  loader(text: string, disabled: boolean) {
    const button = this.children.createChat as Button;
    button.setProps({ label: text, disabled });
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
