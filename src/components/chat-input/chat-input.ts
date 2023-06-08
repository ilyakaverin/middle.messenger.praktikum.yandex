import { Block } from "../../services/block";
import template from "./index.pug";
import { Button } from "../button/button";
import { Input } from "../text-input";
import store from "../../store";
import { ConnectStatus, StoreEvents } from "../../interfaces/enums";
import { Indexed } from "../../interfaces/components";

interface ChatInputProps {
  socket: Indexed;
  message: string;
}

export class ChatInput extends Block<ChatInputProps> {
  constructor(props: ChatInputProps) {
    super({ ...props });

    store.on(StoreEvents.Updated, () => {
      const state = store.getState();

      const { socket, status } = state;

      this.setProps({ socket });

      if (status === ConnectStatus.CONNECTED) {
        this.children.input.setProps({ disabled: false });
        this.children.button.setProps({ disabled: false });
      } else {
        this.children.input.setProps({ disabled: true });
        this.children.button.setProps({ disabled: true });
      }
    });
  }

  init() {
    this.children.button = new Button({
      label: "Send",
      classNames: ["button", "green"],
      disabled: true,
      events: {
        click: (e: Event) => {
          e.preventDefault();

          this.props.socket.send(
            JSON.stringify({
              content: this.props.message,
              type: "message",
            })
          );

          this.children.input.setValue("");
        },
      },
    });

    this.children.input = new Input({
      type: "text",
      classNames: ["text-input"],
      placeholder: "Type message here",
      disabled: true,
      name: "message",
      events: {
        blur: (e: Event) => {
          e.preventDefault();
          this.setProps({ message: e.target.value });
        },
        input: () => {
          this.checkField();
        },
      },
    });
  }

  checkField() {
    if (this.children.input.getValue().length > 0) {
      this.children.button.setProps({ disabled: false });
    } else {
      this.children.button.setProps({ disabled: true });
    }
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
