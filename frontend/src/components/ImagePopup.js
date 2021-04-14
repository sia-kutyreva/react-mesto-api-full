import React from "react";
import popupCloseButton from '../images/close-icon.svg';

function ImagePopup({cardSelected, onClose, isOpen, overlayClose}) {
  function closePopupOverlay(evt) {
    overlayClose(evt)
  }

  return (
    <div className={`popup popup_type_image ${isOpen && 'popup_open-close'}`} onMouseDown={closePopupOverlay}>
      <div className="popup__grid popup__grid_type_card">
        <button type="reset" className="popup__close-button" form="popup-form" onClick={onClose}><img className="popup__close-button-img" src={popupCloseButton} alt="закрыть окно" /></button>
        <img className="popup__img" alt={cardSelected.name} src={cardSelected.link}/>
        <h2 className="popup__img-title">{cardSelected.name}</h2>
      </div>
    </div>
  );
}

export default ImagePopup
