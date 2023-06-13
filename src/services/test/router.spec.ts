import router from "../router";
import { expect } from "chai";
import { routes } from "../../interfaces/enums";
import { FormAccountEdit } from "../../components/form-account-edit/account-edit";
import { FormChangePassword } from "../../components/form-change-password/change-password";
import { FormLogin } from "../../components/form-login/form-login";
import { FormRegister } from "../../components/form-register/form-register";
import { NewChat } from "../../components/new-chat/new-chat";
import { Chat } from "../../layout/chat/chat";

describe("Router", () => {
  router
    .use(routes.login, FormLogin)
    .use(routes.register, FormRegister)
    .use(routes.chat, Chat)
    .use(routes.edit, FormAccountEdit)
    .use(routes.changePassword, FormChangePassword)
    .use(routes.newChat, NewChat)
    .start();

  it("must be defined", () => {
    expect(router).toBeDefined();
  });

  //   it("should works add new routes", () => {
  //     expect(router.getRouters().length).toEqual(2);
  //   });

  //   it("should return lenght of history equal 3", () => {
  //     router.go("/test-3");
  //     expect(window.history.length).toEqual(3);
  //   });
});
