export default class Card {
  constructor(data, templateSelector, openImageModal, handleConfirmClick, userId, handleLikeClick) {
    this._name = data.name;
    this._link = data.link;
    this._likeArray = data.likes;
    this._likeCounter = data.likes.length;
    this._templateSelector = templateSelector;
    this._openImageModal = openImageModal;

    this._ownerId = data.owner._id;
    this._cardId = data._id;
    this._userId = userId;

    this._handleConfirmClick = handleConfirmClick;
    this._handleLikeClick = handleLikeClick;
  }

  _getTemplate() {
    this._card = document.querySelector(this._templateSelector).content.querySelector('.elements__card').cloneNode(true);
    return this._card;
  }

  _setEventListeners() {
    this._likeCardButton.addEventListener("click", () => {
      this._handleLikeButtonClick();
    });

    this._cardImage.addEventListener("click", () => {
      this._openImageModal(this._link, this._name);
    });

    this._deleteCardButton.addEventListener("click", () => {
      this._confirmCardDeletion();
    });
  }

  _confirmCardDeletion  = () => {
    this._handleConfirmClick(this._cardId, this._card);
  };

  _handleDeleteClick() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  _toggleDeleteButton() {
    if (this._userId !== this._ownerId) {
      this._deleteCardButton.remove();
    }
  }

  updateLikesCount(likesCount) {
    this._cardLikeCounter.textContent = likesCount;
  }

  _handleLikeButtonClick() {
    this._handleLikeClick(this._cardId, this._isLiked, this);
    this._isLiked = !this._isLiked;
  }

  setLikeActive() {
    this._likeCardButton.classList.add('elements__button-like_active');
  }

  setLikeInactive() {
    this._likeCardButton.classList.remove('elements__button-like_active');
  }

  generateCard() {
    this._cardElement = this._getTemplate();
    this._isLiked = this._likeArray.some((like) => like._id === this._userId);

    this._cardImage = this._cardElement.querySelector('.elements__image');
    this._cardName = this._cardElement.querySelector('.elements__title');
    this._deleteCardButton = this._cardElement.querySelector('.elements__button-delete');
    this._cardLikeCounter = this._card.querySelector('.elements__like-counter');
    this._likeCardButton = this._cardElement.querySelector('.elements__button-like');
    if (this._isLiked) {
      this._likeCardButton.classList.add('elements__button-like_active');
    }

    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardName.textContent = this._name;
    this._cardLikeCounter.textContent = this._likeCounter;

    this._setEventListeners();
    this._toggleDeleteButton();

    return this._cardElement;
  };
}