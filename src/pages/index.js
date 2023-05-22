import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import './index.css';

import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithConfirm from '../components/PopupWithConfirm.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/api.js';

import {
    validationConfig, popupEditProfileOpen,
    popupAddCardOpen, buttonEditProfileOpen,
    buttonAddCardOpen, nameInput, formAvatarImage,
    jobInput, formAddNewCard, config, popupAvatarEditImage, buttonAvatarImageOpen
} from '../utils/constants.js';

const formValidatorEditProfile = new FormValidator(validationConfig, popupEditProfileOpen);
const formValidatorAddCard = new FormValidator(validationConfig, popupAddCardOpen);
const formValidatorAvatarImage = new FormValidator(validationConfig, popupAvatarEditImage)
const popupWithImage = new PopupWithImage('.popup_image-form');

const api = new Api(config);

Promise.all([api.getUserInfo(), api.getInitialCards()])
    .then(([info, cards]) => {
        userInfo.setUserInfo(info);
        section.renderItems(cards.reverse());
    })
    .catch((err) => console.log(err));

const section = new Section({
    renderer: (item) => {
        section.addItem(createCard(item));
    }
},
    ".elements"
);

function createCard(cardElement) {
    const card = new Card(cardElement, "#element-template", handleCardClick, handleConfirmClick, userInfo.getUserId(), handleLikeButtonClick);
    return card.generateCard();
};

const popupAddCard = new PopupWithForm('.popup_add-form', (formData) => {
    popupAddCard.setButtonText("Сохранение...");
    api
        .addNewCard(formData)
        .then((item) => {
            section.addItem(createCard(item));
            popupAddCard.close();
        })
        .catch((err) => {
            console.log(`Ошибка ${err}`);
        })
        .finally(() => popupAddCard.setButtonText("Создать"));
});

const popupEditProfile = new PopupWithForm('.popup_edit-form', (userData) => {
    popupEditProfile.setButtonText("Сохранение...");
    api
        .setUserInfo(userData)
        .then((newUserData) => {
            userInfo.setUserInfo(newUserData);
        })
        .then(() => {
            popupEditProfile.close();
        })
        .catch((err) => {
            console.log(`Ошибка ${err}`);
        })
        .finally(() => popupEditProfile.setButtonText("Сохранить"));
}
);

const popupEditAvatarImage = new PopupWithForm('.popup_edit-avatar', (newAvatarLink) => {
    popupEditAvatarImage.setButtonText("Сохранение...");
    api
        .updateAvatar(newAvatarLink.link)
        .then((newUserData) => {
            userInfo.setUserInfo(newUserData);
        })
        .then(() => {
            popupEditAvatarImage.close();
        })
        .catch((err) => {
            console.log(`Ошибка ${err}`);
        })
        .finally(() => popupEditAvatarImage.setButtonText("Сохранить"));
}
);

const popupWithConfirm = new PopupWithConfirm('.popup_confirm-form', (cardId, cardElemment) => {
    popupWithConfirm.setButtonText("Удаление...");
    api
        .deleteCard(cardId)
        .then(() => {
            cardElemment.remove();
        })
        .then(() => {
            popupWithConfirm.close();
        })
        .catch((err) => {
            console.log(`Ошибка ${err}`);
        })
        .finally(() => popupWithConfirm.setButtonText("Да"));
}
);

const userInfo = new UserInfo({
    userName: ".profile__name",
    job: ".profile__description",
    profileAvatar: ".profile__avatar-image",
});

function handleLikeButtonClick(cardId, isLiked, cardObject) {
    if (isLiked) {
        api
            .removeLike(cardId)
            .then((updatedCardData) => {
                cardObject.setLikeInactive();
                cardObject.updateLikesCount(updatedCardData.likes.length);
            })
            .catch((err) => {
                console.log(`Ошибка ${err}`);
            });
    } else {
        api
            .addLike(cardId)
            .then((updatedCardData) => {
                cardObject.setLikeActive();
                cardObject.updateLikesCount(updatedCardData.likes.length);
            })
            .catch((err) => {
                console.log(`Ошибка ${err}`);
            });
    }
}

function handleConfirmClick(cardId, cardElemment) {
    popupWithConfirm.open(cardId, cardElemment);
}

function handleCardClick(name, link) {
    popupWithImage.open(name, link)
};

buttonAvatarImageOpen.addEventListener("click", () => {
    formAvatarImage.reset();
    formValidatorAvatarImage.resetValidation();
    popupEditAvatarImage.open();
});

buttonEditProfileOpen.addEventListener('click', () => {
    const userData = userInfo.getUserInfo();
    nameInput.value = userData.userName;
    jobInput.value = userData.job;
    formValidatorEditProfile.resetValidation()
    popupEditProfile.open();
});

buttonAddCardOpen.addEventListener('click', () => {
    formAddNewCard.reset()
    formValidatorAddCard.resetValidation()
    popupAddCard.open();
});

popupWithConfirm.setEventListeners();
popupEditAvatarImage.setEventListeners();
popupWithImage.setEventListeners();
popupAddCard.setEventListeners();
popupEditProfile.setEventListeners();
formValidatorEditProfile.enableValidation();
formValidatorAddCard.enableValidation();
formValidatorAvatarImage.enableValidation();