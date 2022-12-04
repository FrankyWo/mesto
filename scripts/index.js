const popup = document.querySelector('.popup');
let buttonEditOpen = document.querySelector('.profile__button-edit');
let buttonClose = document.querySelector('.popup__button-close');
let getName = document.querySelector('.profile__name');
let getJob = document.querySelector('.profile__description');
let editForm = document.querySelector('.popup__container');
let nameInput = editForm.querySelector('.popup__input_type_name');
let jobInput = editForm.querySelector('.popup__input_type_job');

 function openPopup() {
    popup.classList.add('popup__opened');
    nameInput.value = getName.textContent;
    jobInput.value = getJob.textContent;
};

function closePopup() {
    popup.classList.remove('popup__opened');
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