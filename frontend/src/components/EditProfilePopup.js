import React from "react";
import PopupWithForm from './PopupWithForm.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup({ isOpen, onClose, onUpdateUser, closePopupOverlay, renderLoading, setRenderLoading, closePopupEscape}) {

  const currentUser = React.useContext(CurrentUserContext); 
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');

  React.useEffect(() => {
    setName(currentUser.name || '');
    setDescription(currentUser.about || '');
  }, [currentUser]);

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setRenderLoading(true);
    onUpdateUser({
      name: name,
      about: description,
    });
  }

  return (
    <PopupWithForm 
      name='type_profile'
      title='Редактировать профиль'
      submitButton='Сохранить'
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      overlayClose={closePopupOverlay}
      renderLoading={renderLoading}
      confirmSubmit='Сохранение...'
      closePopupEscape={closePopupEscape}
    >
      <fieldset className="popup__profile">
        <input className="popup__input popup__input_name" 
          value={name} 
          onChange={handleChangeName} 
          id='name-input' 
          type="text" 
          placeholder="Имя" 
          name="name" 
          minLength="2" 
          maxLength="40" 
          required 
        />
        <span className='popup__input-error popup__input-error_active' id='name-input-error'></span>
        <input className="popup__input popup__input_info popup__input_profession" 
          value={description} 
          onChange={handleChangeDescription} 
          id='profession-input' 
          type="text" 
          placeholder="Профессия" 
          name="profession" 
          minLength="2" 
          maxLength="200" 
          required 
        />
        <span className='popup__input-error popup__input-error_active' id='profession-input-error'></span>
      </fieldset>
    </PopupWithForm>)
  
}

export default EditProfilePopup;