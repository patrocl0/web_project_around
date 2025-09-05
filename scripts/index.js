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
const modal = document.querySelector(".modal");
const modalBody = document.querySelector("#modal-body");
const modalCard = document.querySelector(".modal-card");
const overlay = document.querySelector(".overlay");
const openModalBtn = document.querySelector(".btn-open");
const openModalCardBtn = document.querySelector(".btn-open-card");
const closeModalBtn = document.querySelector("#btn-close");

const profileName = document.querySelector("#profileName");
const profileRole = document.querySelector("#profileRole");

const templateCard = document.querySelector("#template-new-card").content;
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

const openModal = function (templateContent) {
  modal.classList.remove("hidden");
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
  openModal(templateProfile);

  const form = document.querySelector("#editForm");
  const nameInput = document.querySelector("#nameInput");
  const roleInput = document.querySelector("#roleInput");

  nameInput.value = profileName.textContent;
  roleInput.value = profileRole.textContent;

  form.addEventListener("submit", guardar);
});
openModalCardBtn.addEventListener("click", () => {
  openModal(templateCard);
  const form = document.querySelector("#createCardForm");

  form.addEventListener("submit", guardarCard);
});

console.log(initialCards);

closeModalBtn.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);
