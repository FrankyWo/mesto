export default class UserInfo {
    constructor({ userName, job, profileAvatar }) {
        this._profileAvatar = document.querySelector(profileAvatar);
        this._userName = document.querySelector(userName);
        this._userJob = document.querySelector(job);
    };

    getUserId() {
        return this._userId;
    };

    getUserInfo() {
        return {
            userName: this._userName.textContent,
            job: this._userJob.textContent,
        }
    };

    setUserInfo(data) {
        this._data = data;
        this._userId = data._id;
        this._userName.textContent = this._data.name;
        this._userJob.textContent = this._data.about;
        this._profileAvatar.src = data.avatar;
        this._profileAvatar.alt = data.name;
    }
};