import { ChatInput } from "../../components/chat-input/chat-input";
import { ChatList } from "../../components/chat-list/chat-list";
import { ChatMessages } from "../../components/chat-messages/chat-messages";
import { StoreEvents, ConnectStatus, routes } from "../../interfaces/enums";
import { Block } from "../../services/block";
import router from "../../services/router";
import { getUser } from "../../sources/auth";
import { connectToChat, getChats } from "../../sources/chat";
import { isLogged } from "../../sources/constants";
import { setupSocket } from "../../sources/socket";
import store from "../../store";
import template from "./index.pug";

export class Chat extends Block {
  constructor(props: any) {
    super({ ...props });

    if (!isLogged()) router.back();

    getChats()
      .then((data) => {
        store.set("chats", data.message);
      })
      .then(() => {
        getUser().then((data) => {
          store.set("userId", data.id);
        });
      });
  }

  private pingWS: number;

  init() {
    this.children.chat_messages = new ChatMessages({});
    this.children.chat_input = new ChatInput({ socket: {} });
    this.children.chat_list = new ChatList({ chats: [] });

    store.on(StoreEvents.Updated, async () => {
      const state = store.getState();

      if (state.status === ConnectStatus.DISCONNECTING && state.socket) {
        state.socket.close();
      }

      this.setProps({
        currentChat: state.currentChat,
        userId: state.userId,
        token: state.token,
      });
      const hasData = state.currentChat && state.userId && state.token;

      try {
        if (
          this.props.currentChat &&
          !this.props.token &&
          state.status === ConnectStatus.CONNECTING
        ) {
          const response = await connectToChat(this.props.currentChat);
          store.set("token", response.message.token);
        }

        if (hasData && !state.socket) {
          const socket = setupSocket(
            state.userId,
            state.currentChat,
            state.token
          );
          store.set("socket", socket);

          state.socket.addEventListener("open", () => {
            new Notification("подключился к чату!");
            store.set("status", ConnectStatus.CONNECTED);

            socket.send(
              JSON.stringify({
                content: "Подключился к комнате!",
                type: "message",
              })
            );

            this.pingWS = setInterval(() => {
              socket.send(
                JSON.stringify({
                  type: "ping",
                })
              );
            }, 20000);
          });

          socket.onmessage = (event) => {
            const message = JSON.parse(event.data);

            if (message.type === "message") {
              store.updateMessages(message);
            }
          };

          socket.addEventListener("close", (event) => {
            clearInterval(this.pingWS);
            if (event.wasClean) {
              new Notification("Соединение закрыто чисто");
            } else {
              new Notification("Обрыв соединения");
            }

            console.log(`Код: ${event.code} | Причина: ${event.reason}`);
          });
        }
      } catch (e) {
        new Notification(e);
      }
    });
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
