export class UserInfo {
  constructor({ nameSelector, roleSelector, avatarSelector }) {
    this._nameElement = document.querySelector(nameSelector);
    this._roleElement = document.querySelector(roleSelector);
    this._avatarElement = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      role: this._roleElement.textContent,
      avatar: this._avatarElement.textContent,
    };
  }

  setUserInfo({ name, role, avatar }) {
    this._nameElement.textContent = name;
    this._roleElement.textContent = role;
    if (avatar) this._avatarElement.src = avatar;
  }

  setUserAvatar(avatarLink) {
    this._avatarElement.src = avatarLink;
  }
}
