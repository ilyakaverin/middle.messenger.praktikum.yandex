import '../layout/container/container.scss';
import '../components/form-container/form-container.scss';
import '../components/text-input/text-input.scss';
import '../components/form-login/form-login.scss';
import '../components/button/button.scss';
import '../components/avatar/avatar.scss';
import '../components/form-register/form-register.scss';
import '../components/form-account-edit/account-edit.scss';
import '../components/form-change-password/change-password.scss';
import '../components/chat-container/chat-container.scss';
import '../components/chat-list/chat-list.scss';
import '../layout/chat/chat-layout.scss';
import '../components/chat-messages/chat-messages.scss';
import '../components/chat-input/chat-input.scss';
import '../components/chat-list-user/chat-list-user.scss';
import './styles.scss';

const buttons = document.querySelectorAll('button');

const buttonCreate = (buttonText) => Array.from(buttons)
  .find((button) => button.innerText === buttonText);

const router = (button, from, to) => {
  button.addEventListener('click', (e) => {
    e.preventDefault();
    from.classList.add('hidden');
    to.classList.remove('hidden');
  });
};

const enter = buttonCreate('Enter');
const logout = buttonCreate('logout');
const registerButton = buttonCreate('Register');
const createProfile = buttonCreate('Create profile');
const editProfile = buttonCreate('Edit profile');
const changePasswordButton = buttonCreate('Change password');
const backToLogin = buttonCreate('Back to login');
const saveAndExit = buttonCreate('Save and exit');
const backToEdit = buttonCreate('Back to edit');
const accountEditSave = buttonCreate('Save');

const login = document.getElementById('login');
const register = document.getElementById('register');
const changePassword = document.getElementById('change_password');
const accountEdit = document.getElementById('account_edit');
const chat = document.getElementById('chat_container');

const route1 = router(enter, login, chat);
const route2 = router(logout, chat, login);
const route3 = router(registerButton, login, register);
const route4 = router(editProfile, chat, accountEdit);
const route5 = router(changePasswordButton, accountEdit, changePassword);
const route6 = router(backToLogin, register, login);
const route7 = router(createProfile, register, chat);
const route8 = router(saveAndExit, changePassword, accountEdit);
const route9 = router(backToEdit, changePassword, accountEdit);
const router10 = router(accountEditSave, accountEdit, chat);
