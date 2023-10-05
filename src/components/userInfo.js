export default class UserInfo {
  constructor({ userNameSelector, userAboutSelector, userAvatarSelector }) {
    this._userName = userNameSelector;
    this._userAbout = userAboutSelector;
    this._avatar = userAvatarSelector;
  }

  getUserInfo() {
    const profileData = {
      name: this._userName.textContent,
      about: this._userAbout.textContent,
      avatar: this._avatar.src,
    };
    return profileData;
  }

  setUserInfo(profileData) {
    this._userName.textContent = profileData.name;
    this._userAbout.textContent = profileData.about;
    this._avatar.src = profileData.avatar;
  }
}
