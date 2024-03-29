import { Block } from "../../services/block";
import template from "./index.pug";
import { Button } from "../button/button";
import router from "../../services/router";
import { logout } from "../../sources/auth";
import { StoreEvents, routes } from "../../interfaces/enums";
import { ChatChannel } from "../chat-channel/chat-channel";
import store from "../../store";
import { cutStringIfLong, isEqual } from "../../utils";
import cn from "../../utils/classnames";

interface ChatListProps {
  chats?: Record<string, unknown>[];
  events?: {
    click: () => void;
  };
}

export class ChatList extends Block<ChatListProps> {
  constructor(props: ChatListProps) {
    super({ ...props });

    store.on(StoreEvents.Updated, () => {
      const state = store.getState();

      const { chats, userId } = state;
      //@ts-ignore toDO
      if (isEqual(chats, this.props.chats)) {
        return;
      } else {
        this.setProps({ chats });

        if (Array.isArray(this.props.chats)) {
          const components = this.props?.chats.map(
            (chat) =>
              new ChatChannel({
                chatLabel: cutStringIfLong(chat.title as string, 9),
                id: chat.id as number,
                userId,
              })
          );

          this.setChildren({ list: components });
        }
      }
    });
  }

  init() {
    this.children.button1 = new Button({
      label: "logout",
      classNames: cn(["button", "purple", "full-width"]),
      events: {
        click: async () => {
          try {
            await logout();
            localStorage.removeItem("logged");
            router.go(routes.login);
          } catch (e) {
            new Notification(e);
          }
        },
      },
    });
    this.children.button2 = new Button({
      label: "Edit profile",
      classNames: cn(["button", "green", "full-width"]),
      events: {
        click: () => {
          router.go(routes.edit);
        },
      },
    });
    this.children.button3 = new Button({
      label: "New chat",
      classNames: cn(["button", "green", "full-width"]),
      events: {
        click: () => {
          router.go(routes.newChat);
        },
      },
    });
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
