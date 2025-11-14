import { Card } from "./card.js";
import { FormValidator } from "./formValidator.js";
import { Section } from "./components/Section.js";
import { PopupWithImage } from "./components/PopupWithImage.js";
import { PopupWithForm } from "./components/PopupWithForm.js";
import { UserInfo } from "./components/UserInfo.js";
import Api from "./components/Api.js";

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

const api = new Api({
  baseUrl: "https://around-api.es.tripleten-services.com/v1",
  headers: {
    authorization: "3a5671ca-7742-4269-b748-d908d71db785",
    "Content-Type": "application/json",
  },
});

const userInfo = new UserInfo({
  nameSelector: "#profileName",
  roleSelector: "#profileRole",
});

const popupImage = new PopupWithImage(".popup_type_image");
popupImage.setEventListeners();

function createCard(data) {
  const card = new Card(data, "#card-template", (name, link) => {
    popupImage.open(name, link);
  });
  return card.generateCard();
}

const cardSection = new Section(
  {
    items: [],
    renderer: (data) => {
      const cardElement = createCard(data);
      cardSection.addItem(cardElement);
    },
  },
  ".gallery-card"
);

api
  .getInitialCards()
  .then((cards) => {
    cardSection._items = cards;
    cardSection.renderItems(cards);
  })
  .catch((err) => console.log("Error cargando tarjetas:", err));

const popupEditProfile = new PopupWithForm(
  ".popup_type_edit-profile",
  (formData) => {
    userInfo.setUserInfo({
      name: formData["name"],
      role: formData["about"],
    });
  }
);
popupEditProfile.setEventListeners();

const popupAddCard = new PopupWithForm(".popup_type_add-card", (formData) => {
  const newCard = createCard({ name: formData.title, link: formData.link });
  cardSection.addItem(newCard);
});
popupAddCard.setEventListeners();

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save-button",
  inactiveButtonClass: "popup__save-button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

const editProfileValidator = new FormValidator(
  validationConfig,
  document.querySelector("#form-edit-profile")
);
editProfileValidator.enableValidation();

const editProfileButton = document.querySelector(".profile__edit-button");
editProfileButton.addEventListener("click", () => {
  const currentUser = userInfo.getUserInfo();
  const nameInput = document.querySelector("#nameInput");
  const roleInput = document.querySelector("#roleInput");
  nameInput.value = currentUser.name;
  roleInput.value = currentUser.role;

  editProfileValidator.resetValidation();
  popupEditProfile.open();
});

const addCardValidator = new FormValidator(
  validationConfig,
  document.querySelector("#form-add-card")
);
addCardValidator.enableValidation();

const addCardButton = document.querySelector(".profile__add-button");
addCardButton.addEventListener("click", () => {
  addCardValidator.resetValidation();
  popupAddCard.open();
});
