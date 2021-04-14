import React from "react";
import PopupWithForm from './PopupWithForm.js';

function DeletePlacePopup({ isOpen, onClose, onDeletePlace, closePopupOverlay, cardDelete, renderLoading, setRenderLoading, closePopupEscape }) {

  function handleSubmit(e) {
    e.preventDefault();
    setRenderLoading(true);
    onDeletePlace(cardDelete);
  }

  return (
    <PopupWithForm
            onSubmit={handleSubmit}
            name='delete-card'
            title='Вы уверены?'
            submitButton='Да'
            isOpen={isOpen}
            onClose={onClose}
            overlayClose={closePopupOverlay}
            renderLoading={renderLoading}
            confirmSubmit='Удаление...'
            closePopupEscape={closePopupEscape}
    />
  )
  
}

export default DeletePlacePopup;