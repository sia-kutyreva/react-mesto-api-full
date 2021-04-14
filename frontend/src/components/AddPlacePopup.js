import React from "react";
import PopupWithForm from './PopupWithForm.js';

function AddPlacePopup({ isOpen, onClose, onAddPlace, closePopupOverlay, renderLoading, setRenderLoading, closePopupEscape }) {

  const [name, setName] = React.useState('');
  const [link, setLink] = React.useState('');

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeLink(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setRenderLoading(true);
    onAddPlace({
      name: name,
      link: link
    });
    setName('');
    setLink('');
  } 

  return (
    <PopupWithForm 
            name='new-card'
            title='Новое место'
            submitButton='Создать'
            onSubmit={handleSubmit}
            isOpen={isOpen}
            onClose={onClose}
            overlayClose={closePopupOverlay}
            renderLoading={renderLoading}
            confirmSubmit='Сохранение...'
            closePopupEscape={closePopupEscape}
          >
            <fieldset className="popup__profile">
              <input className="popup__input popup__input_name popup__input_name-card"
                onChange={handleChangeName}
                value={name}
                type="text" 
                placeholder="Название" 
                name="name" 
                id='new-card-name' 
                minLength="2" 
                maxLength="30" 
                required 
              />
              <span className='popup__input-error popup__input-error_active' id='new-card-name-error'></span>
              <input className="popup__input popup__input_info popup__input_link-card"
                onChange={handleChangeLink}
                value={link}
                type="url" 
                placeholder="Ссылка на картинку" 
                name="link" 
                id='new-link-name' 
                required 
              />
              <span className='popup__input-error popup__input-error_active' id='new-link-name-error'></span>
            </fieldset>
    </PopupWithForm>
  )
  
}

export default AddPlacePopup;