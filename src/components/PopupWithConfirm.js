import Popup from './Popup.js';

export default class PopupWithConfirm extends Popup {
    constructor(popupSelector, handleFormSubmit) {
        super(popupSelector);
        this._confirmButton = this._popup.querySelector('.popup__button-submit');
        this._handleFormSubmit = handleFormSubmit;
    }

    setButtonText(text) {
        this._confirmButton.value = text;
    }

    setEventListeners() {
        super.setEventListeners();

        this._confirmButton.addEventListener('click', () => {
            this._handleFormSubmit(this._cardId, this._cardElemment);
        });
    }

    open(cardId, cardElemment) {
        this._cardId = cardId;
        this._cardElemment = cardElemment;
        super.open();
    }
};