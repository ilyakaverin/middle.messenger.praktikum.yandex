import { StoreEvents } from "../../interfaces/enums";
import { Block } from "../../services/block";
import store from "../../store";
import { formatDate } from "../../utils";
import { Button } from "../button/button";
import { ChatAddUser } from "../chat-add-user/chat-add-user";
import { ChatUsers } from "../chat-users/chat-users";
import { Message } from "../message/message";
import template from "./index.pug";

interface ChatMessagesProps {
  token: string;
  currentChat: number;
  userId: number;
  events?: {
    click: () => void;
  };
}

export class ChatMessages extends Block<ChatMessagesProps> {
  constructor(props: ChatMessagesProps) {
    super({ ...props });
  }

  init() {
    store.on(StoreEvents.Updated, () => {
      const messages = store.getMessages();

      if (messages.length > 0) {
        const components = messages
          .filter((message) => message.type === "message")
          .map(
            (message) =>
              new Message({
                content: message.content,
                time: formatDate(message.time),
                user: message.user_id,
              })
          );
        this.setChildren({
          messages: components,
        });
      } else {
        this.setChildren({ messages: [] });
      }
    });
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
