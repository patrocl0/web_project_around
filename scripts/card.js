export class Card {
  constructor(
    data,
    templateSelector,
    { handleCardClick, handleDelete, handleLike },
    currentUserId
  ) {
    this._name = data.name;
    this._link = data.link;
    this._id = data._id;
    this._ownerId = data.owner;
    this._isLikedStatus = data.isLiked;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleDelete = handleDelete;
    this._handleLike = handleLike;
    this._currentUserId = currentUserId;
  }

  _getTemplate() {
    const cardTemplate = document
      .querySelector(this._templateSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    return cardTemplate;
  }

  _setEventListeners() {
    this._cardImage.addEventListener("click", () => {
      this._handleCardClick({ name: this._name, link: this._link });
    });

    this._likeButton.addEventListener("click", () => {
      if (this._handleLike) {
        this._handleLike(this);
      }
    });

    if (this._ownerId === this._currentUserId) {
      this._deleteButton.addEventListener("click", () => {
        this._handleDelete();
      });
    }
  }

  _isLiked() {
    return this._isLikedStatus === true; // ✔️
  }

  updateLikes(newData) {
    this._isLikedStatus = newData.isLiked;

    if (this._isLikedStatus) {
      this._likeButton.classList.add("card__like-button_active");
    } else {
      this._likeButton.classList.remove("card__like-button_active");
    }
  }

  generateCard() {
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector(".card__image");
    this._cardTitle = this._element.querySelector(".card__title");
    this._likeButton = this._element.querySelector(".card__like-button");
    this._deleteButton = this._element.querySelector(".card__delete");

    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardTitle.textContent = this._name;

    if (this._isLiked()) {
      this._likeButton.classList.add("card__like-button_active");
    }

    this._setEventListeners();

    return this._element;
  }

  removeCard() {
    this._element.remove();
    this._element = null;
  }
}
