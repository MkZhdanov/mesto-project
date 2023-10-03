export default class UserInfo {
  constructor({ userNameSelector, userAboutSelector }) {
    this._userName = userNameSelector;
    this._userAbout = userAboutSelector;
  }

  getUserInfo() {
    const profileData = {
      name: this._userName.textContent,
      about: this._userAbout.textContent,
    };
    console.log(profileData);
    return profileData;
  }

  setUserInfo(profileData) {
    this._userName.textContent = profileData.name;
    this._userAbout.textContent = profileData.about;
  }
}
