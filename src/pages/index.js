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

// Понимаю что может быть не то что ожидали.
// если это совсем не катит, то вернусь к этому позже.
// либо на этапе разработки роутера сделаю как надо