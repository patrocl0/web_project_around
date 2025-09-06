const initialCards = [
  {
    name: "Valle de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lake-louise.jpg",
  },
  {
    name: "Montañas Calvas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/latemar.jpg",
  },
  {
    name: "Parque Nacional de la Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lago.jpg",
  },
];

const galleryCard = document.querySelector("#gallery-card");
const modal = document.querySelector(".modal--normal");
const modalBody = document.querySelector("#modal-body");
const modalImage = document.querySelector(".modal-image");
const overlay = document.querySelector(".overlay");
const openModalBtn = document.querySelector(".btn-open");
const openModalCardBtn = document.querySelector(".btn-open-card");

const closeModalBtn = document.querySelector("#btn-close");

const profileName = document.querySelector("#profileName");
const profileRole = document.querySelector("#profileRole");

const templateCard = document.querySelector("#template-new-card").content;
const templateImage = document.querySelector("#image-template").content;
const templateProfile = document.querySelector(
  "#template-edit-profile"
).content;

const addCard = (card) => {
  const cardElement = document.createElement("div");
  cardElement.classList.add("card");

  const buttonDelete = document.createElement("button");
  buttonDelete.classList.add("card__delete");
  buttonDelete.type = "button";
  buttonDelete.setAttribute("aria-label", "Eliminar");

  const icon = document.createElement("i");
  icon.classList.add("fa-solid", "fa-trash");

  const image = document.createElement("img");
  image.classList.add("btn-open-image");
  image.src = card.link;
  image.alt = card.name;

  const footer = document.createElement("div");
  footer.classList.add("card__footer");

  const title = document.createElement("h3");
  title.textContent = card.name;

  const button = document.createElement("button");
  button.type = "button";
  button.classList.add("card__button");
  button.setAttribute("aria-label", "Eliminar");

  image.addEventListener("click", () => {
    openModal(templateImage, "large");

    const modalImage = modal.querySelector(".modal--large__image");
    const titleImage = modal.querySelector(".modal--large__title");
    closeModalBtn.classList.add("color__text");

    modalImage.src = card.link;
    titleImage.textContent = card.name;
  });

  buttonDelete.appendChild(icon);
  footer.appendChild(title);
  footer.appendChild(button);
  cardElement.appendChild(buttonDelete);
  cardElement.appendChild(image);
  cardElement.appendChild(footer);
  galleryCard.prepend(cardElement);
  buttonDelete.addEventListener("click", () => {
    cardElement.remove();

    initialCards = initialCards.filter((c) => c.name !== card.name);
  });
};

initialCards.forEach((card) => {
  addCard(card);
});

const btnModalImage = document.querySelector(".btn-open-image");

const openModal = function (templateContent, size) {
  modal.classList.remove("modal--normal", "modal--large", "hidden");
  modal.classList.add(`modal--${size}`);
  overlay.classList.remove("hidden");

  modalBody.replaceChildren(templateContent.cloneNode(true));
};

const openModalImage = () => {
  modalImage.classList.remove("hidden");
  overlay.classList.remove("hidden");

  modalBody.replaceChildren(templateContent.cloneNode(true));
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

const guardar = function (e) {
  e.preventDefault();
  profileName.textContent = nameInput.value;
  profileRole.textContent = roleInput.value;
  closeModal();
};

const guardarCard = function (e) {
  e.preventDefault();

  const titleInput = document.querySelector("#titleInput");
  const linkInput = document.querySelector("#linkInput");

  const newCard = {
    name: titleInput.value,
    link: linkInput.value,
  };

  initialCards.push(newCard);
  addCard(newCard);

  closeModal();
};

openModalBtn.addEventListener("click", () => {
  openModal(templateProfile, "normal");

  const form = document.querySelector("#editForm");
  const nameInput = document.querySelector("#nameInput");
  const roleInput = document.querySelector("#roleInput");
  closeModalBtn.classList.remove("color__text");

  nameInput.value = profileName.textContent;
  roleInput.value = profileRole.textContent;

  form.addEventListener("submit", guardar);
});
openModalCardBtn.addEventListener("click", () => {
  openModal(templateCard, "normal");

  const form = document.querySelector("#createCardForm");
  closeModalBtn.classList.remove("color__text");

  form.addEventListener("submit", guardarCard);
});

closeModalBtn.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);
