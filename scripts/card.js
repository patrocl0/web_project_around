export class Card {
  constructor({ name, link }, handleImageClick) {
    this._name = name;
    this._link = link;
    this._handleImageClick = handleImageClick;
  }

  generateCard() {
    this._element = this._createCardElement();
    this._setEventListeners();
    return this._element;
  }

  _createCardElement() {
    const card = document.createElement("article");
    card.classList.add("card");

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("card__delete");
    deleteButton.setAttribute("aria-label", "Eliminar tarjeta");
    deleteButton.innerHTML = `<i class="fa-solid fa-trash"></i>`;

    const image = document.createElement("img");
    image.classList.add("card__image");
    image.src = this._link;
    image.alt = this._name;

    const footer = document.createElement("div");
    footer.classList.add("card__footer");

    const title = document.createElement("h3");
    title.classList.add("card__title");
    title.textContent = this._name;

    const likeButton = document.createElement("button");
    likeButton.classList.add("card__like-button");
    likeButton.setAttribute("aria-pressed", "false");
    likeButton.setAttribute("aria-label", "Dar me gusta");
    likeButton.innerHTML = `<i class="fa-regular fa-heart"></i>`;

    footer.append(title, likeButton);
    card.append(deleteButton, image, footer);

    this._deleteButton = deleteButton;
    this._likeButton = likeButton;
    this._image = image;

    return card;
  }

  _setEventListeners() {
    this._image.addEventListener("click", () =>
      this._handleImageClick(this._name, this._link)
    );

    this._deleteButton.addEventListener("click", () => this._handleDelete());
    this._likeButton.addEventListener("click", () => this._handleLikeToggle());
  }

  _handleLikeToggle() {
    const icon = this._likeButton.querySelector("i");
    const isActive = this._likeButton.classList.toggle(
      "card__like-button--active"
    );

    icon.classList.toggle("fa-solid", isActive);
    icon.classList.toggle("fa-regular", !isActive);

    this._likeButton.setAttribute("aria-pressed", isActive ? "true" : "false");
  }

  _handleDelete() {
    this._element.remove();
    this._element = null;
  }
}
