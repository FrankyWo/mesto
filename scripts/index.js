const popup = document.querySelector('.popup');
const popupEditForm = document.querySelector('.popup_edit-form');
const popupAddForm = document.querySelector('.popup_add-form');

const buttonEditOpen = document.querySelector('.profile__button-edit');
const buttonAddOpen = document.querySelector('.profile__button-add');
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

const popups = document.querySelectorAll('.popup');
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

buttonEditOpen.addEventListener('click', function () {
    openPopup(popupEditForm);
    nameInput.value = getName.textContent;
    jobInput.value = getJob.textContent;
});

function submitProfileForm(evt) {
    evt.preventDefault();
    getName.textContent = nameInput.value;
    getJob.textContent = jobInput.value;
    closePopup(popupEditForm);
};

buttonAddOpen.addEventListener('click', function () {
    openPopup(popupAddForm);
});

function submitCardForm(evt) {
    evt.preventDefault();
    const cardLink = cardLinkInput.value;
    const cardTitle = cardTitleInput.value
    renderCard(createCard(cardLink, cardTitle));
    closePopup(popupAddForm);

    cardLinkInput.value = "";
    cardTitleInput.value = "";
};

cardNameInput.addEventListener('submit', submitCardForm);
popupEditForm.addEventListener('submit', submitProfileForm);

const elementInfo = initialCards.map(function (item) {
    return {
        name: item.name,
        link: item.link,
    };
});

// Исправил/добавил на то, что как мне кажеться просит ревью.
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

    // Switch "like"
    elementCard.querySelector('.elements__button-like').addEventListener('click', function (evt) {
        evt.target.classList.toggle('elements__button-like_active');
    });

    // Btn "delete"
    elementCard.querySelector('.elements__button-delete').addEventListener('click', function () {
        elementCard.remove();
    });

    // Исправил/добавил на то, что как мне кажеться просит ревью.
    elementCardImage.addEventListener('click', () => {
        openPopupImage(cardLink, cardTitle);
    });

    // Было до исправлений
    // popup "Image" Было до исправлений
    /*elementCardImage.addEventListener('click', function () {
        openPopup(popupImage);
        popupImagePlace.src = cardLink;
        popupImageTitle.alt = cardTitle;
        popupImageTitle.textContent = cardTitle;
    });*/

    return elementCard;
};

const renderCard = (newCard) => {
    elementsContainer.prepend(newCard);
};

elementInfo.forEach((item) => {
    renderCard(createCard(item.link, item.name));
});

const validationConfig = {
    formSelector: '.popup__container',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit',
    inactiveButtonClass: 'popup__btn_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active'
};