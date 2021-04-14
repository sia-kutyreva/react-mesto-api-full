import React from "react";
import popupCloseButton from '../images/close-icon.svg';

function PopupWithForm({name, title, submitButton, isOpen, onClose, overlayClose, children, onSubmit, renderLoading, confirmSubmit, closePopupEscape }) {
  const popupOpened = isOpen && 'popup_open-close'
  function closePopupOverlay(evt) {
    overlayClose(evt)
  }

  function handleEsc(evt) {
    closePopupEscape(evt)
  }

  React.useEffect(() => {
    document.addEventListener('keydown', handleEsc);

    return () => {
      document.removeEventListener('keydown', handleEsc);
    }
  })

  return (
    <div className={`popup popup_type_${name} ${popupOpened}`} onMouseDown={closePopupOverlay}>
      <div className="popup__grid">
        <button type="reset" className="popup__close-button" form="popup-form" onClick={onClose}><img className="popup__close-button-img" src={popupCloseButton} alt="закрыть окно" /></button>
        <form className="popup__container" onSubmit={onSubmit} id={`popup-form-${name}`} autoComplete="on" name={`popup-form-${name}`}>
          <h2 className="popup__title">{title}</h2>
            {children}
          <button className="popup__submit-button">{renderLoading ? confirmSubmit : submitButton}</button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
