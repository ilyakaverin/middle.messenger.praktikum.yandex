import { StoreEvents } from "../../interfaces/enums";
import { Block } from "../../services/block";
import { getChatUsers } from "../../sources/chat";
import store from "../../store";
import { isEqual } from "../../utils";
import { User } from "../chat-user/chat-user";
import template from "./index.pug";

interface IChatUsersProps {
  chatId: number;
}

interface IUser {
  id: number;
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
  avatar: string;
  role: string;
}

export class ChatUsers extends Block {
  constructor(props: IChatUsersProps) {
    super({ type: "div", ...props });

    getChatUsers(this.props.chatId)
      .then((data) => {
        store.set("chatUsers", data.message);
      })
      .catch((e) => new Notification(e));
  }

  init() {
    store.on(StoreEvents.Updated, () => {
      const { chatUsers, userId } = store.getState();

      if (isEqual(chatUsers, this.props.users)) {
      } else {
        if (Array.isArray(chatUsers)) {
          this.setProps({ users: chatUsers });

          const components = this.props.users.map(
            (user: IUser) =>
              new User({
                title: user.login,
                id: user.id,
                chatId: this.props.chatId,
                owner: userId,
              })
          );

          this.setChildren({ usersData: components });
        }
      }
    });
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
