const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const openModalBtn = document.querySelector(".btn-open");
const closeModalBtn = document.querySelector("#btn-close");

const form = document.querySelector("#editForm");
const profileName = document.querySelector("#profileName");
const profileRole = document.querySelector("#profileRole");

const nameInput = document.querySelector("#nameInput");
const roleInput = document.querySelector("#roleInput");

const openModal = function () {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");

  nameInput.value = profileName.textContent;
  roleInput.value = profileRole.textContent;
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

openModalBtn.addEventListener("click", openModal);
closeModalBtn.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);
form.addEventListener("submit", guardar);
