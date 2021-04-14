const popupImage = document.querySelector('.popup__img');
const popupImageTitle = document.querySelector('.popup__img-title');
const popupNewCardOpen = document.querySelector('.profile__add-button');
const popupProfOpen = document.querySelector('.profile__edit-button');
const popupProfile = document.querySelector('.popup_type_profile');
const profileInputList = Array.from(popupProfile.querySelectorAll('.popup__input'));
const profileSubmitButton = popupProfile.querySelector('.popup__submit-button');
const popupNewCard = document.querySelector('.popup_type_new-card');
const newCardInputList = Array.from(popupNewCard.querySelectorAll('.popup__input'));
const newCardSubmitButton = popupNewCard.querySelector('.popup__submit-button');
const profileInputName = popupProfile.querySelector('.popup__input_name');
const profileInputProfession = popupProfile.querySelector('.popup__input_profession');
const profileName = document.querySelector('.profile__name');
const profileProf = document.querySelector('.profile__profession');
const profileAvatar = document.querySelector('.profile__avatar');
const profileAvatarOverlay = document.querySelector('.profile__avatar-overlay');
const parameters = {
  formSelector: '.popup__container',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
}

export { popupImage, popupImageTitle, popupNewCardOpen, popupProfOpen, popupProfile, popupNewCard, profileInputName, profileInputProfession, parameters, profileInputList, 
  newCardInputList, profileSubmitButton, newCardSubmitButton, profileName, profileProf, profileAvatar, profileAvatarOverlay };