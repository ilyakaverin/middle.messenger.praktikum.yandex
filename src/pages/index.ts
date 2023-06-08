import "../components/form-container/form-container.scss";
import "../components/form-login/form-login.scss";
import "../components/avatar/avatar.scss";
import "../components/chat-container/chat-container.scss";
import "../components/chat-messages/chat-messages.scss";
import "../components/chat-list-user/chat-list-user.scss";
import "../components/chat-list/chat-list.scss";
import "./styles.scss";
import "../components/button/button.scss";
import "../components/error/error.scss";
import "../components/chat-channel/chat-channel.scss";
import "../components/chat-add-user/chat-add-user.scss";
import "../components/text-input/text-input.scss";
import "../components/message/message.scss";
import router from "../services/router";
import { FormLogin } from "../components/form-login/form-login";
import { FormRegister } from "../components/form-register/form-register";
import { Chat } from "../layout/chat/chat";
import { FormAccountEdit } from "../components/form-account-edit/account-edit";
import { FormChangePassword } from "../components/form-change-password/change-password";
import { routes } from "../interfaces/enums";
import { NewChat } from "../components/new-chat/new-chat";

router
  .use(routes.login, FormLogin)
  .use(routes.register, FormRegister)
  .use(routes.chat, Chat)
  .use(routes.edit, FormAccountEdit)
  .use(routes.changePassword, FormChangePassword)
  .use(routes.newChat, NewChat)
  .start();

Notification.requestPermission().then((permission) => {
  if (permission === "granted") {
    const permissionRequestBanner = document.getElementById(
      "notificationRequest"
    );

    permissionRequestBanner?.remove();
    // …
  }
});
