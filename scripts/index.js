const popup = document.querySelector('.popup');
const popups = document.querySelectorAll('.popup');
const popupEditProfileOpen = document.querySelector('.popup_edit-form');
const popupAddCardOpen = document.querySelector('.popup_add-form');

const buttonEditProfileOpen = document.querySelector('.profile__button-edit');
const buttonAddCardOpen = document.querySelector('.profile__button-add');
const buttonClose = document.querySelectorAll('.popup__button-close');

const getName = document.querySelector('.profile__name');
const getJob = document.querySelector('.profile__description');
const editForm = document.querySelector('.popup__container');
const nameInput = editForm.querySelector('.popup__input_type_name');
const jobInput = editForm.querySelector('.popup__input_type_job');

const cardNameInput = document.querySelector('#card-name');
const cardTitleInput = document.querySelector('.popup__input_type_title');
const cardLinkInput = document.querySelector('.popup__input_type_link');

const popupImage = document.querySelector('.popup_image-form');
const popupImagePlace = document.querySelector('.popup__image-place');
const popupImageTitle = document.querySelector('.popup__image-title');

const elementsContainer = document.querySelector('.elements');

popups.forEach((popup) => {
    popup.addEventListener('mousedown', (evt) => {
        if (evt.target.classList.contains('popup_opened')) {
            closePopup(popup);
        }
        if (evt.target.classList.contains('popup__button-close')) {
            closePopup(popup);
        };
    });
});

function closePopupByEscape(evt) {
    if (evt.key === "Escape") {
        const openPopup = document.querySelector('.popup_opened');
        closePopup(openPopup);
    };
};

function openPopup(item) {
    item.classList.add('popup_opened');
    document.addEventListener('keydown', closePopupByEscape);
};

function closePopup(item) {
    item.classList.remove('popup_opened');
    document.removeEventListener('keydown', closePopupByEscape);
};

buttonEditProfileOpen.addEventListener('click', () => {
    nameInput.value = getName.textContent;
    jobInput.value = getJob.textContent;
    setButtonState(popupEditProfileOpen);
    setErrorState(popupEditProfileOpen);
    openPopup(popupEditProfileOpen);
});

function submitProfileForm(evt) {
    evt.preventDefault();
    getName.textContent = nameInput.value;
    getJob.textContent = jobInput.value;
    closePopup(popupEditProfileOpen);
};

buttonAddCardOpen.addEventListener('click', () => {
    resetAddCardPopup();
    setButtonState(popupAddCardOpen);
    setErrorState(popupAddCardOpen);
    openPopup(popupAddCardOpen);
});

function submitCardForm(evt) {
    evt.preventDefault();
    const cardLink = cardLinkInput.value;
    const cardTitle = cardTitleInput.value
    renderCard(createCard(cardLink, cardTitle));
    closePopup(popupAddCardOpen);
};

function resetAddCardPopup() {
    cardLinkInput.value = '';
    cardTitleInput.value = '';
};

cardNameInput.addEventListener('submit', submitCardForm);
popupEditProfileOpen.addEventListener('submit', submitProfileForm);

initialCards.map(function (item) {
    return {
        name: item.name,
        link: item.link,
    };
});

function openPopupImage(cardLink, cardTitle) {
    popupImagePlace.src = cardLink;
    popupImageTitle.alt = cardTitle;
    popupImageTitle.textContent = cardTitle;
    openPopup(popupImage);
};

const createCard = (cardLink, cardTitle) => {
    const elementTemplate = document.querySelector('#element-template').content;
    const elementCard = elementTemplate.querySelector('.elements__card').cloneNode(true);
    const elementCardImage = elementCard.querySelector('.elements__image');

    elementCard.querySelector('.elements__title').textContent = cardTitle;
    elementCard.alt = cardTitle;
    elementCardImage.src = cardLink;

    elementCard.querySelector('.elements__button-like').addEventListener('click', function (evt) {
        evt.target.classList.toggle('elements__button-like_active');
    });

    elementCard.querySelector('.elements__button-delete').addEventListener('click', function () {
        elementCard.remove();
    });

    elementCardImage.addEventListener('click', () => {
        openPopupImage(cardLink, cardTitle);
    });

    return elementCard;
};

const renderCard = (newCard) => {
    elementsContainer.prepend(newCard);
};

initialCards.forEach((item) => {
    renderCard(createCard(item.link, item.name));
});