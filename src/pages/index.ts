import "../components/form-container/form-container.scss";
import "../components/form-login/form-login.scss";
import "../components/avatar/avatar.scss";
import "../components/chat-container/chat-container.scss";
import "../components/chat-messages/chat-messages.scss";
import "../components/chat-list-user/chat-list-user.scss";
import "../components/chat-list/chat-list.scss";
import "./styles.scss";
import { App } from "../layout/container/container";

const root = document.getElementById("root");

const app = new App({});

root?.append(app.getContent()!);

const buttons = document.querySelectorAll("button");

const buttonCreate = (buttonText: string) =>
  Array.from(buttons).find((button) => button.innerText === buttonText);

const router = (
  button: HTMLButtonElement | undefined,
  from: HTMLElement | null,
  to: HTMLElement | null
) => {
  button!.addEventListener("click", (e) => {
    e.preventDefault();
    from!.classList.add("hidden");
    to!.classList.remove("hidden");
  });
};

const enter = buttonCreate("Enter");
const logout = buttonCreate("logout");
const registerButton = buttonCreate("Register");
const createProfile = buttonCreate("Create profile");
const editProfile = buttonCreate("Edit profile");
const changePasswordButton = buttonCreate("Change password");
const backToLogin = buttonCreate("Back to login");
const saveAndExit = buttonCreate("Save and exit");
const backToEdit = buttonCreate("Back to edit");
const accountEditSave = buttonCreate("Save");

const login = document.getElementById("login");
const register = document.getElementById("register");
const changePassword = document.getElementById("change_password");
const accountEdit = document.getElementById("account_edit");
const chat = document.getElementById("chat_container");

router(enter, login, chat);
router(logout, chat, login);
router(registerButton, login, register);
router(editProfile, chat, accountEdit);
router(changePasswordButton, accountEdit, changePassword);
router(backToLogin, register, login);
router(createProfile, register, chat);
router(saveAndExit, changePassword, accountEdit);
router(backToEdit, changePassword, accountEdit);
router(accountEditSave, accountEdit, chat);
