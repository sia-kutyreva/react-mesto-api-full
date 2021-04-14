import React from "react";
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import ImagePopup from './ImagePopup.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import DeletePlacePopup from './DeletePlacePopup.js';


function UserCards({
      userEmail,
      onAddPlaceClick,
      signOut,
      onEditAvatar,
      onEditProfile,
      onCardClick,
      cards,
      onCardLike,
      onCardDelete,
      isOpenAvatarPopup,
      isOpenProfilePopup,
      isOpenAddPlacePopup,
      isOpenDeleteCardPopup,
      isOpenImageForm, 
      onClose,
      closePopupOverlay,
      closePopupEscape,
      onUpdateAvatar,
      renderLoading,
      setRenderLoading,
      onUpdateUser,
      onAddPlace,
      cardSelected,
      overlayClose,
      cardDelete,
      onDeletePlace}
  ) {

  return (
        <>
          <Header 
            headerLink={"Выход"} 
            path={"/sign-in"}
            onClick={signOut}
            userEmail={userEmail}
          />

          <Main 
            onEditAvatar={onEditAvatar}
            onEditProfile={onEditProfile}
            onAddPlace={onAddPlaceClick}
            onCardClick={onCardClick}
            cards={cards}
            onCardLike={onCardLike}
            onCardDelete={onCardDelete}
          />

          <Footer />

          <EditAvatarPopup 
            isOpen={isOpenAvatarPopup} 
            onClose={onClose}
            closePopupOverlay={closePopupOverlay}
            closePopupEscape={closePopupEscape}
            onUpdateAvatar={onUpdateAvatar}
            renderLoading={renderLoading}
            setRenderLoading={setRenderLoading}
          />

          <EditProfilePopup 
            isOpen={isOpenProfilePopup} 
            onClose={onClose}
            onUpdateUser={onUpdateUser}
            closePopupOverlay={closePopupOverlay}
            renderLoading={renderLoading}
            setRenderLoading={setRenderLoading}
            closePopupEscape={closePopupEscape}
          />

          <AddPlacePopup 
            isOpen={isOpenAddPlacePopup}
            onClose={onClose}
            closePopupOverlay={closePopupOverlay}
            onAddPlace={onAddPlace}
            renderLoading={renderLoading}
            setRenderLoading={setRenderLoading}
            closePopupEscape={closePopupEscape}
          />

          <ImagePopup 
            cardSelected={cardSelected}
            onClose={onClose}
            overlayClose={overlayClose}
            isOpen={isOpenImageForm}
            closePopupEscape={closePopupEscape}
          />

          <DeletePlacePopup 
            cardDelete={cardDelete}
            onClose={onClose}
            closePopupOverlay={closePopupOverlay}
            isOpen={isOpenDeleteCardPopup}
            onDeletePlace={onDeletePlace}
            renderLoading={renderLoading}
            setRenderLoading={setRenderLoading}
            closePopupEscape={closePopupEscape}
          />
        </>
  );
}

export default UserCards;
