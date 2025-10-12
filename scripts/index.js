import { enableValidation } from "./validate.js";

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

  const buttonLike = document.createElement("button");
  buttonLike.type = "button";
  buttonLike.classList.add("card__button");
  buttonLike.setAttribute("aria-label", "Me gusta");

  const iconLike = document.createElement("i");
  iconLike.classList.add("fa-regular", "fa-heart");
  buttonLike.appendChild(iconLike);

  image.addEventListener("click", () => {
    openModal(templateImage, "large");

    const modalImage = modal.querySelector(".modal--large__image");
    const titleImage = modal.querySelector(".modal--large__title");
    closeModalBtn.classList.add("color__text");

    modalImage.src = card.link;
    titleImage.textContent = card.name;
  });

  buttonLike.addEventListener("click", () => {
    buttonLike.classList.toggle("liked");

    if (buttonLike.classList.contains("liked")) {
      iconLike.classList.remove("fa-regular");
      iconLike.classList.add("fa-solid");
    } else {
      iconLike.classList.remove("fa-solid");
      iconLike.classList.add("fa-regular");
    }
  });

  galleryCard.prepend(cardElement);
  cardElement.appendChild(buttonDelete);
  buttonDelete.appendChild(icon);
  cardElement.appendChild(image);
  footer.appendChild(title);
  cardElement.appendChild(footer);
  footer.appendChild(buttonLike);
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

// const showInputError = (formElement, inputElement, errorMessage, config) => {
//   const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
//   inputElement.classList.add(config.inputErrorClass);
//   errorElement.textContent = errorMessage;
//   errorElement.classList.add(config.errorClass);
// };

// const hideInputError = (formElement, inputElement, config) => {
//   const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
//   inputElement.classList.remove(config.inputErrorClass);
//   errorElement.textContent = "";
//   errorElement.classList.remove(config.errorClass);
// };

// const checkInputValidity = (formElement, inputElement, config) => {
//   if (!inputElement.validity.valid) {
//     showInputError(
//       formElement,
//       inputElement,
//       inputElement.validationMessage,
//       config
//     );
//   } else {
//     hideInputError(formElement, inputElement, config);
//   }
// };

// const hasInvalidInput = (inputList) => {
//   return inputList.some((inputElement) => !inputElement.validity.valid);
// };

// const toggleButtonState = (inputList, buttonElement, config) => {
//   if (hasInvalidInput(inputList)) {
//     buttonElement.classList.add(config.inactiveButtonClass);
//     buttonElement.disabled = true;
//   } else {
//     buttonElement.classList.remove(config.inactiveButtonClass);
//     buttonElement.disabled = false;
//   }
// };

// const setEventListeners = (formElement, config) => {
//   const inputList = Array.from(
//     formElement.querySelectorAll(config.inputSelector)
//   );
//   const buttonElement = formElement.querySelector(config.submitButtonSelector);

//   toggleButtonState(inputList, buttonElement, config);

//   inputList.forEach((inputElement) => {
//     inputElement.addEventListener("input", () => {
//       checkInputValidity(formElement, inputElement, config);
//       toggleButtonState(inputList, buttonElement, config);
//     });
//   });
// };

// const enableValidation = (config) => {
//   const formList = Array.from(document.querySelectorAll(config.formSelector));

//   formList.forEach((formElement) => {
//     formElement.addEventListener("submit", (evt) => evt.preventDefault());
//     setEventListeners(formElement, config);
//   });
// };

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
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

  enableValidation(validationConfig);
});
openModalCardBtn.addEventListener("click", () => {
  openModal(templateCard, "normal");

  const form = document.querySelector("#createCardForm");

  closeModalBtn.classList.remove("color__text");
  form.addEventListener("submit", guardarCard);
  enableValidation(validationConfig);
});

closeModalBtn.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeModal();
  }
});
