import React from "react";
import PopupWithForm from './PopupWithForm.js';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, closePopupOverlay, renderLoading, setRenderLoading, closePopupEscape }) {

  const [avatar, setAvatar] = React.useState('');

  function handleChangeAvatar(e) {
    setAvatar(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setRenderLoading(true);
    onUpdateAvatar({
      avatar: avatar,
    });
    setAvatar('');
  } 

  return (
    <PopupWithForm
            onSubmit={handleSubmit}
            name='new-avatar'
            title='Обновить аватар'
            submitButton='Сохранить'
            isOpen={isOpen}
            onClose={onClose}
            overlayClose={closePopupOverlay}
            closePopupEscape={closePopupEscape}
            renderLoading={renderLoading}
            confirmSubmit='Сохранение...'
          >
            <fieldset className="popup__profile">
              <input className="popup__input popup__input_name popup__input_new-avatar"
                onChange={handleChangeAvatar}
                value={avatar}
                type="url" 
                placeholder="Ссылка на фото" 
                name="name" 
                id='new-avatar-link' 
                required 
              />
              <span className='popup__input-error popup__input-error_active' id='new-avatar-name-error'></span>
            </fieldset>
          </PopupWithForm>
    )
  
}

export default EditAvatarPopup;