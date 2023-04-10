import { Block } from "../../services/block";
import template from "./container.pug";
import { FormLogin } from "../../components/form-login/form-login";
import { FormRegister } from "../../components/form-register/form-register";
import { FormAccountEdit } from "../../components/form-account-edit/account-edit";
import { FormChangePassword } from "../../components/form-change-password/change-password";
import { Chat } from "../chat/chat";

export class App extends Block {
  constructor(props: any) {
    super({ ...props });
  }

  init() {
    this.children.login = new FormLogin({ label: "login" });
    this.children.register = new FormRegister({ label: "register" });
    this.children.account_edit = new FormAccountEdit({ label: "account edit" });
    this.children.change_password = new FormChangePassword({
      label: "change password",
    });
    this.children.chat = new Chat({});
  }

  render() {
    return this.compile(template, this.children);
  }
}
