import { Card } from "./card.js";
import { openModal, closeModal } from "./utils.js";
import { FormValidator } from "./formValidator.js";

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

const openModalBtn = document.querySelector(".btn-open");
const openModalCardBtn = document.querySelector(".btn-open-card");

const closeModalBtn = document.querySelector("#btn-close");

const profileName = document.querySelector("#profileName");
const profileRole = document.querySelector("#profileRole");

const templateProfile = document.querySelector(
  "#template-edit-profile"
).content;

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
  addCardToGallery(newCard);

  closeModal();
};

const handleCardImageClick = (name, link) => {
  const template = document.querySelector("#image-template").content;
  openModal(template, "large");
  const modalImage = modal.querySelector(".modal--large__image");
  const titleImage = modal.querySelector(".modal--large__title");
  modalImage.src = link;
  titleImage.textContent = name;
};

const addCardToGallery = (data) => {
  const card = new Card(data, handleCardImageClick);
  const cardElement = card.generateCard();
  galleryCard.prepend(cardElement);
};

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

initialCards.forEach(addCardToGallery);

openModalBtn.addEventListener("click", () => {
  openModal(templateProfile, "normal");
  const form = document.querySelector("#editForm");
  const nameInput = document.querySelector("#nameInput");
  const roleInput = document.querySelector("#roleInput");
  const validator = new FormValidator(validationConfig, form);

  closeModalBtn.classList.remove("color__text");
  nameInput.value = profileName.textContent;
  roleInput.value = profileRole.textContent;

  form.addEventListener("submit", guardar);

  validator.enableValidation();

  validator.resetValidation();
});

openModalCardBtn.addEventListener("click", () => {
  const template = document.querySelector("#template-new-card").content;
  openModal(template, "normal");
  const form = document.querySelector("#createCardForm");
  const validator = new FormValidator(validationConfig, form);

  closeModalBtn.classList.remove("color__text");
  form.addEventListener("submit", guardarCard);

  validator.enableValidation();

  validator.resetValidation();
});

closeModalBtn.addEventListener("click", closeModal);
