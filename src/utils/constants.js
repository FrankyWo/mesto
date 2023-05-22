export const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button-submit',
    inactiveButtonClass: 'popup__button-submit_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_visible'
};

export const config = {
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-62',
    headers: {
        authorization: 'a55c6cfe-02fb-4fc3-9874-006214ccb36a',
        'Content-Type': 'application/json'
    }
};

export const popupEditProfileOpen = document.querySelector('.popup_edit-form');
export const popupAddCardOpen = document.querySelector('.popup_add-form');

export const buttonAvatarImageOpen = document.querySelector('.profile__avatar-edit-button');
export const popupAvatarEditImage = document.querySelector('.popup_edit-avatar');

export const buttonEditProfileOpen = document.querySelector('.profile__button-edit');
export const buttonAddCardOpen = document.querySelector('.profile__button-add');

export const getName = document.querySelector('.profile__name');
export const getJob = document.querySelector('.profile__description');
export const editForm = document.querySelector('.popup__container');
export const nameInput = editForm.querySelector('.popup__input_type_name');
export const jobInput = editForm.querySelector('.popup__input_type_job');

export const cardTitleInput = document.querySelector('.popup__input_type_title');
export const cardLinkInput = document.querySelector('.popup__input_type_link');

export const formAddNewCard = document.querySelector('.popup__form_new-card');
export const formAvatarImage = document.querySelector('.popup__form_avatar-edit')

//export const popup = document.querySelector('.popup');
//export const popups = document.querySelectorAll('.popup');

//export const buttonClose = document.querySelectorAll('.popup__button-close');

//export const cardNameInput = document.querySelector('#card-name');

//export const popupImage = document.querySelector('.popup_image-form');
//export const popupImagePlace = document.querySelector('.popup__image-place');
//export const popupImageTitle = document.querySelector('.popup__image-title');

//export const elementsContainer = document.querySelector('.elements');