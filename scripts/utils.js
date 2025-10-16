const modal = document.querySelector(".modal--normal");
const modalBody = document.querySelector("#modal-body");
const overlay = document.querySelector(".overlay");

let activeModal = null;

export function openModal(templateContent, size) {
  modalBody.replaceChildren(templateContent.cloneNode(true));
  modal.classList.remove("modal--normal", "modal--large", "hidden");
  modal.classList.add(`modal--${size}`);
  overlay.classList.remove("hidden");

  activeModal = modal;

  document.addEventListener("keydown", handleEscape);
  overlay.addEventListener("click", handleOverlayClick);
}

export function closeModal() {
  const overlay = document.querySelector(".overlay");

  if (!activeModal) return;

  activeModal.classList.add("hidden");
  overlay.classList.add("hidden");

  activeModal = null;

  document.removeEventListener("keydown", handleEscape);
  overlay.removeEventListener("click", handleOverlayClick);
}

function handleEscape(evt) {
  if (evt.key === "Escape" && activeModal) {
    closeModal();
  }
}

function handleOverlayClick() {
  closeModal();
}
