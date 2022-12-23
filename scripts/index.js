const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

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
const titleInput = document.querySelector('.popup__input_type_title');
const linkInput = document.querySelector('.popup__input_type_link');

const popupImage = document.querySelector('.popup_image-form');
const popupImagePlace = document.querySelector('.popup__image-place');
const popupImageTitle = document.querySelector('.popup__image-title');

const elementsContainer = document.querySelector('.elements');

buttonClose.forEach(button => button.addEventListener('click', () => {
    const popup = button.closest('.popup');
    closePopup(popup);
}));

function openPopup() {
    popup.classList.add('popup_opened');
};

function closePopup(item) {
    item.classList.remove('popup_opened');
};

buttonEditOpen.addEventListener('click', function () {
    openPopup(popupEditForm);
    nameInput.value = getName.textContent;
    jobInput.value = getJob.textContent;
});

buttonAddOpen.addEventListener('click', function () {
    popupAddForm.classList.add('popup_opened');
});

function formSubmitProfile(evt) {
    evt.preventDefault();
    getName.textContent = nameInput.value;
    getJob.textContent = jobInput.value;
    closePopup(popupEditForm);
};

popupEditForm.addEventListener('submit', formSubmitProfile);

const elementInfo = initialCards.map(function (item) {
    return {
        name: item.name,
        link: item.link,
    };
});

const createCard = (cardLink, cardTitle) => {
    const elementTemplate = document.querySelector('#element-template').content;
    const elementCard = elementTemplate.querySelector('.elements__card').cloneNode(true);

    elementCard.querySelector('.elements__image').src = cardLink;
    elementCard.querySelector('.elements__title').textContent = cardTitle;

    // Switch "like"
    elementCard.querySelector('.elements__button-like').addEventListener('click', function (evt) {
        evt.target.classList.toggle('elements__button-like_active');
    });

    // Btn "delete"
    elementCard.querySelector('.elements__button-delete').addEventListener('click', function () {
        elementCard.remove();
    });
    // popup "Image"
    elementCard.querySelector('.elements__image').addEventListener('click', function () {
        popupImage.classList.add('popup_opened');
        popupImagePlace.src = cardLink;
        popupImageTitle.alt = cardTitle;
        popupImageTitle.textContent = cardTitle;
    });

    return elementCard;
};

const renderCard = (newCard) => {
    elementsContainer.prepend(newCard);
};

elementInfo.forEach((item) => {
    renderCard(createCard(item.link, item.name));
});

function formSubmitCard(evt) {
    evt.preventDefault();
    const cardLink = linkInput.value;
    const cardTitle = titleInput.value
    renderCard(createCard(cardLink, cardTitle));
    closePopup(popupAddForm);
};

cardNameInput.addEventListener('submit', formSubmitCard);