export default class Api {
    constructor(config) {
        this._baseUrl = config.baseUrl;
        this._headers = config.headers;
    }

    getInitialCards() {
        return fetch('https://mesto.nomoreparties.co/v1/cohort-62/cards', {
            headers: this._headers,
        }).then((err) => {
            return this._checkResponse(err);
        });
    }

    addNewCard(cardElement) {
        return fetch('https://mesto.nomoreparties.co/v1/cohort-62/cards', {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify({
                name: cardElement.name,
                link: cardElement.link,
            }),
        }).then((err) => {
            return this._checkResponse(err);
        });
    }

    getUserInfo() {
        return fetch('https://mesto.nomoreparties.co/v1/cohort-62/users/me', {
            headers: this._headers,
        }).then((err) => {
            return this._checkResponse(err);
        });
    }

    setUserInfo(data) {
        return fetch('https://mesto.nomoreparties.co/v1/cohort-62/users/me', {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: data.userName,
                about: data.job,
            }),
        }).then((err) => {
            return this._checkResponse(err);
        });
    }

    deleteCard(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}`, {
            method: 'DELETE',
            headers: this._headers,
        }).then((err) => {
            return this._checkResponse(err);
        });
    }

    addLike(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
            method: "PUT",
            headers: this._headers,
        }).then((res) => {
            return this._checkResponse(res);
        });
    }

    removeLike(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
            method: "DELETE",
            headers: this._headers,
        }).then((res) => {
            return this._checkResponse(res);
        });
    }

    updateAvatar(newAvatarLink) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({
                avatar: newAvatarLink,
            }),
        }).then(this._checkResponse);
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    };
};