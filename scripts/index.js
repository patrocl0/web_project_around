import { Card } from "./card.js";
import { FormValidator } from "./formValidator.js";
import { Section } from "./components/Section.js";
import { PopupWithImage } from "./components/PopupWithImage.js";
import { PopupWithForm } from "./components/PopupWithForm.js";
import { PopupWithConfirmation } from "./components/PopupWithConfirmation.js";
import { UserInfo } from "./components/UserInfo.js";
import Api from "./components/Api.js";

let currentUserId;

const popupConfirm = new PopupWithConfirmation(".popup_type_confirm");
popupConfirm.setEventListeners();

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
  avatarSelector: ".profile__avatar",
});

const popupImage = new PopupWithImage(".popup_type_image");
popupImage.setEventListeners();

function createCard(data) {
  const card = new Card(
    data,
    "#card-template",
    {
      handleCardClick: ({ name, link }) => popupImage.open(name, link),
      handleDelete: () => {
        popupConfirm.setSubmitAction(() => {
          console.log(data);

          api
            .deleteCard(data._id)
            .then(() => {
              console.log(currentUserId);

              card.removeCard();
              popupConfirm.close();
            })
            .catch((err) => console.error("Error eliminando tarjeta:", err));
        });
        popupConfirm.open();
      },
      handleLike: () => handleLike(card),
    },
    currentUserId
  );
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

api.getUserInfo().then((user) => {
  userInfo.setUserInfo({
    name: user.name,
    role: user.about,
    avatar: user.avatar,
  });
  currentUserId = user._id;
});

api
  .getInitialCards()
  .then((cards) => {
    cards.forEach((cardData) => {
      const cardElement = createCard(cardData);
      cardSection.addItem(cardElement);
    });
  })
  .catch((err) => console.log("Error cargando tarjetas:", err));

const popupEditProfile = new PopupWithForm(
  ".popup_type_edit-profile",
  (formData) => {
    popupEditProfile.renderLoading(true);

    api
      .updateUserInfo({
        name: formData.name,
        about: formData.about,
        avatar: formData.avatar,
      })
      .then((updatedUser) => {
        userInfo.setUserInfo({
          name: updatedUser.name,
          role: updatedUser.about,
          avatar: updatedUser.avatar,
        });
        popupEditProfile.close();
      })
      .catch((err) => console.error("Error actualizando perfil:", err))
      .finally(() => popupEditProfile.renderLoading(false));
  }
);
popupEditProfile.setEventListeners();

const popupAddCard = new PopupWithForm(".popup_type_add-card", (formData) => {
  popupAddCard.renderLoading(true);

  api
    .addCard({ title: formData.title, link: formData.link })
    .then((cardData) => {
      const newCard = createCard(cardData);
      cardSection.addItem(newCard);
      popupAddCard.close();
    })
    .catch((err) => console.log(err))
    .finally(() => {
      popupAddCard.renderLoading(false);
    });
});
popupAddCard.setEventListeners();

const popupEditAvatar = new PopupWithForm(".popup_edit_avatar", (formData) => {
  popupEditAvatar.renderLoading(true);
  api
    .updateAvatar({ avatar: formData.avatar })
    .then((user) => {
      userInfo.setUserAvatar(user.avatar);
      popupEditAvatar.close();
    })
    .catch((err) => console.log("Error actualizando avatar:", err))
    .finally(() => popupEditAvatar.renderLoading(false));
});
popupEditAvatar.setEventListeners();

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

const editAvatarButton = document.querySelector(".profile__avatar-edit");

editAvatarButton.addEventListener("click", () => {
  const currentUser = userInfo.getUserInfo();

  api.getUserInfo().then((user) => {
    const avatarLinkInput = document.querySelector("#avatarLinkInput");
    avatarLinkInput.value = user.avatar;
  });

  console.log(currentUser);
  popupEditAvatar.open();
});

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

const addAvatarValidator = new FormValidator(
  validationConfig,
  document.querySelector("#form-edit-avatar")
);
addAvatarValidator.enableValidation();

const addCardButton = document.querySelector(".profile__add-button");
addCardButton.addEventListener("click", () => {
  addCardValidator.resetValidation();
  popupAddCard.open();
});

function handleLike(card) {
  const hasLiked = card._isLiked();

  if (!hasLiked) {
    api
      .addLike(card._id)
      .then((updatedCard) => {
        card.updateLikes(updatedCard);
      })
      .catch((err) => console.log(err));
  } else {
    api
      .removeLike(card._id)
      .then((updatedCard) => {
        card.updateLikes(updatedCard);
      })
      .catch((err) => console.log(err));
  }
}
