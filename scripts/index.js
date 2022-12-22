const popup = document.querySelector('.popup');
let buttonEditOpen = document.querySelector('.profile__button-edit');
let buttonClose = document.querySelector('.popup__button-close');
let getName = document.querySelector('.profile__name');
let getJob = document.querySelector('.profile__description');
let editForm = document.querySelector('.popup__container');
let nameInput = editForm.querySelector('.popup__input_type_name');
let jobInput = editForm.querySelector('.popup__input_type_job');

function openPopup() {
    popup.classList.add('popup_opened');
    nameInput.value = getName.textContent;
    jobInput.value = getJob.textContent;
};

function closePopup() {
    popup.classList.remove('popup_opened');
};

function formSubmitHandler(evt) {
    evt.preventDefault();
    getName.textContent = nameInput.value;
    getJob.textContent = jobInput.value;
    closePopup();
};

buttonEditOpen.addEventListener('click', openPopup);
buttonClose.addEventListener('click', closePopup);
editForm.addEventListener('submit', formSubmitHandler);

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

const elementsContainer = document.querySelector('.elements');

const elementInfo = initialCards.map(function (item) {
    return {
        name: item.name,
        link: item.link,
    };
});

function createCard(link, name) {
    const elementTemplate = document.querySelector('#element-template').content;
    const elementCard = elementTemplate.querySelector('.elements__card').cloneNode(true);

    elementCard.querySelector('.elements__image').src = link;
    elementCard.querySelector('.elements__title').textContent = name;

    elementsContainer.prepend(elementCard);
};

function loadInitialCards(elements) {
    elements.reverse().forEach(({link, name}) => {
        createCard(link, name);
    })
}

loadInitialCards(initialCards)