import { Popup } from "./Popup.js";
export class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._confirmButton = this._popup.querySelector(".popup__confirm-button");
  }

  setSubmitAction(action) {
    this._handleConfirm = action;
  }

  setEventListeners() {
    super.setEventListeners();
    this._confirmButton.addEventListener("click", () => {
      if (this._handleConfirm) {
        this._handleConfirm();
      }
    });
  }
}
