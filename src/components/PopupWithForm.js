import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor(popupSelector, submitCallback) {
        super(popupSelector);
        this._submitCallback = submitCallback;
        this._form = this._popup.querySelector('.popup__form');
        this._inputList = this._form.querySelectorAll('.popup__input');
        this._confirmButton = this._form.querySelector('.popup__button-submit');
    };

    setButtonText(text) {
        this._confirmButton.value = text;
    }

    _getInputValues() {
        const formValues = {};
        this._inputList.forEach((input) => {
            formValues[input.name] = input.value;
        });
        return formValues;
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._inputValues = this._getInputValues();
            this._submitCallback(this._inputValues);
        });
    }

    close() {
        super.close();
        this._form.reset();
    }
};