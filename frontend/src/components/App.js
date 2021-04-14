import React from "react";
import Login from './Login.js';
import UserCards from './UserCards.js';
import Register from './Register.js';
import ProtectedRoute from './ProtectedRoute.js';
import InfoTooltip from './InfoTooltip.js';
import * as userAuth from '../utils/userAuth';
import api from '../utils/api.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';


function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [selectedCard, setIsSelectedCard] = React.useState(false);
  const [isDeleteCardPopup, setIsDeleteCardPopup] = React.useState(false);
  const [isImageFormOpen, setIsImageFormOpen] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const [loggedInUserEmail, setLoggedInUserEmail] = React.useState('');
  const [cards, setCards] = React.useState([]);
  const [deleteCard, setDeleteCard] = React.useState({});
  const [renderLoading, setRenderLoading] = React.useState(false);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [successfulRegistration, setSuccessfulRegistration] = React.useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
  const history = useHistory();

  React.useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([userInfo, cardsResult]) => {
        setCards(cardsResult);
        setCurrentUser(userInfo);
      })
      .catch((err) => console.log(`Ошибка получении данных: ${err}`))
  }, []);

  React.useEffect(() => {
    checkToken();
  }, [loggedIn, history])

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        const newCards = cards.map((c) => c._id === card._id ? newCard : c);
        setCards(newCards);
      })
      .catch((err) => console.log(`Ошибка: ${err}`)) 
  }

  function handleCardDelete(card) {
    const isOwn = card.owner._id === currentUser._id;
    if (isOwn) {
      setIsDeleteCardPopup(true);
      setDeleteCard(card);
    }
  }

  function confirmedDeleteCard(card) {
    api.deleteCard(card)
        .then(() => {
          const newCards = cards.filter((c) => c._id !== card._id);
          setCards(newCards);
          closeAllPopups();
        })
        .catch((err) => console.log(`Ошибка: ${err}`))
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function closeAllPopups() {
    setIsInfoTooltipOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);

    //setIsSelectedCard(false);
    setIsImageFormOpen(false);
    setIsDeleteCardPopup(false);
    setRenderLoading(false);
  }

  function handleCardClick(data) {
    setIsImageFormOpen(true);
    setIsSelectedCard(data);
  }

  function closePopupOverlay(e) {
    e.target.classList.contains('popup_open-close') && closeAllPopups()
  }

  function closePopupEscape(evt) {
    if (evt.key === "Escape") {
      closeAllPopups();
    }
  }

  function handleUpdateUser(e) {
    api.updateUserInfo(e)
      .then((userData) => {
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch((err) => console.log(`Ошибка обновления данных пользователя: ${err}`))
  }

  function handleUpdateAvatar(e) {
    api.updateAvatar(e)
      .then((userData) => {
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch((err) => console.log(`Ошибка обновления данных пользователя: ${err}`))
  }

  function handleAddPlace(data) {
    api.addNewCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(`Ошибка добавления новой карточки: ${err}`))
      
  }

  function onRegister(data) {
    userAuth.register( data )
      .then(() => {
        setIsInfoTooltipOpen(true);
        setSuccessfulRegistration(true);
        history.push('/sign-in');
      })   
      .catch((err) => {
        console.log(err);
        setIsInfoTooltipOpen(true);
        setSuccessfulRegistration(false);
      })   
  }

  function onLogin(data) {
    userAuth.authorization(data)
      .then((res) => {
        setLoggedIn(true);
        localStorage.setItem('jwt', res.token);
        history.push("/user-cards");
      })
      .catch((err) => {
        console.log(err);
        setIsInfoTooltipOpen(true);
        setSuccessfulRegistration(false);
      })
  }

  function checkToken() {
    if (localStorage.getItem('jwt')) {
      const jwt = localStorage.getItem('jwt');
      userAuth.getContent(jwt)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            setLoggedInUserEmail(res.data.email);
            history.push("/user-cards");
          }
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }

  function signOut() {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
    <div className="body-background">

      <div className="page">

          <Switch>
            <Route path="/sign-up">
              <Register 
                onRegister={onRegister}
                signOut={signOut}
              />
            </Route>

            <Route path="/sign-in">
              <Login 
                onLogin={onLogin}
                signOut={signOut}
              />
            </Route>

            <ProtectedRoute path="/user-cards"
              component={UserCards}
              userEmail={loggedInUserEmail}
              successfulRegistration={successfulRegistration}
              signOut={signOut}
              loggedIn={loggedIn}
              onEditAvatar={handleEditAvatarClick}
              onEditProfile={handleEditProfileClick}
              onAddPlaceClick={handleAddPlaceClick}
              onCardClick={handleCardClick}
              cards={cards}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
              isOpenAvatarPopup={isEditAvatarPopupOpen}
              isOpenProfilePopup={isEditProfilePopupOpen}
              isOpenAddPlacePopup={isAddPlacePopupOpen}
              isOpenDeleteCardPopup={isDeleteCardPopup}
              isOpenImageForm={isImageFormOpen}
              onClose={closeAllPopups}
              closePopupOverlay={closePopupOverlay}
              closePopupEscape={closePopupEscape}
              onUpdateAvatar={handleUpdateAvatar}
              renderLoading={renderLoading}
              setRenderLoading={setRenderLoading}
              onUpdateUser={handleUpdateUser}
              onAddPlace={handleAddPlace}
              cardSelected={selectedCard}
              overlayClose={closePopupOverlay}
              cardDelete={deleteCard}
              onDeletePlace={confirmedDeleteCard}
            />

            <Route path="/">
              {loggedIn ? <Redirect to="/user-cards" /> : <Redirect to="/sign-in" />}
            </Route>

          </Switch>
        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          onClose={closeAllPopups}
          successfulRegistration={successfulRegistration}
          overlayClose={closePopupOverlay}
          closePopupEscape={closePopupEscape}
        />
      </div>
    </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
