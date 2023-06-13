import { ConnectStatus, StoreEvents } from "../../interfaces/enums";
import { Block } from "../../services/block";
import { deleteChat, getChats } from "../../sources/chat";
import store from "../../store";
import { Button } from "../button/button";
import template from "./index.pug";

interface IChatChanelProps {
  chatLabel: string;
  id: number;
  status: "connected" | "disconnected" | "connecting" | "disconnecting";
}

export class ChatChannel extends Block {
  constructor(props: IChatChanelProps) {
    super({ type: "span", ...props });
  }

  private clickEvents = {
    [ConnectStatus.DISCONNECTED]: () => {
      store.set("currentChat", this.props.id);
      store.set("status", ConnectStatus.CONNECTING);
    },
    [ConnectStatus.CONNECTED]: () => {
      store.set("status", ConnectStatus.DISCONNECTING);
      store.batchEvents([
        store.remove("token"),
        store.removeMessages(),
        store.remove("socket"),
        store.remove("searchResult"),
        store.remove("chatUsers"),
      ]);
      store.set("status", ConnectStatus.DISCONNECTED);
      store.remove("currentChat");
    },
  };

  init() {
    this.children.connect = new Button({
      label: "Connect",
      disabled: false,
      classNames: ["button", "green", "button-small"],
      events: {
        click: () => {
          store.set("currentChat", this.props.id);
          store.set("status", ConnectStatus.CONNECTING);
        },
      },
    });
    this.children.deleteChat = new Button({
      label: "Delete",
      disabled: false,
      classNames: ["button", "purple", "button-small"],
      events: {
        click: async () => {
          const request = { chatId: this.props.id };
          this.loader(this.children.deleteChat as Button, "Deleting", true);

          try {
            await deleteChat(request);
            const response = await getChats();
            this.loader(this.children.deleteChat as Button, "Delete", false);
            store.set("chats", response.message);
          } catch (e) {
            new Notification(e);
            this.loader(this.children.deleteChat as Button, "Delete", false);
          }
        },
      },
    });
    store.on(StoreEvents.Updated, () => {
      const state = store.getState();

      const { currentChat, status } = state;

      this.setProps({ status });

      const statusesForDisabling = [
        ConnectStatus.CONNECTING,
        ConnectStatus.DISCONNECTING,
        ConnectStatus.CONNECTED,
      ];

      if (currentChat === this.props.id) {
        this.children.connect.setProps({
          label: status,
          events: {
            click: this.clickEvents[status],
          },
        });
        this.children.deleteChat.setProps({ disabled: true });
      } else if (statusesForDisabling.includes(status)) {
        this.children.connect.setProps({ disabled: true });
      } else {
        this.children.connect.setProps({ disabled: false });
        this.children.deleteChat.setProps({ disabled: false });
      }
    });
  }

  loader(button: Button, text: string, disabled: boolean) {
    button.setProps({ label: text, disabled });
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
