import React from "react";
import successImage from "../images/successImage.svg";
import failImage from "../images/failImage.svg";
import popupCloseButton from '../images/close-icon.svg';

function InfoTooltip({ closePopupEscape, overlayClose, successfulRegistration, onClose, isOpen }) {
  const popupOpened = isOpen && 'popup_open-close';
  const popupImage = successfulRegistration ? successImage : failImage;
  const popupTitle = successfulRegistration ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.';
  const popupImgAlt = successfulRegistration ? 'Успех' : 'Что-то пошло не так! Попробуйте ещё раз.';

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
    <div className={`popup ${popupOpened}`} onMouseDown={closePopupOverlay}>
      <div className="popup__grid popup__grid_type_info">
        <button type="reset" className="popup__close-button" form="popup-form" onClick={onClose}><img className="popup__close-button-img" src={popupCloseButton} alt="закрыть окно" /></button>
        <div className="popup__elements">
          <img className="popup__image" src={popupImage} alt={popupImgAlt}/>
          <h1 className="popup__text">{popupTitle}</h1>
        </div>
      </div>
    </div>
  )      
}

export default InfoTooltip;
