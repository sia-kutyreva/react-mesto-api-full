import React from "react";
import profEditButton from '../images/edit-button.svg';
import addButton from '../images/add-button.svg';
import Card from './Card.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main({onEditAvatar, onEditProfile, onAddPlace, onCardClick, cards, onCardLike, onCardDelete }) {

  const currentUserInfo = React.useContext(CurrentUserContext);

  return (
    <main className="main-content">

    <section className="profile main-content__profile">
      <div className="profile__wrapper">
        <div className="profile__avatar-overlay" onClick={onEditAvatar}>
          <img className="profile__avatar" src={currentUserInfo.avatar} alt='аватарка'/>
        </div>
        <div className="profile__info">
          <h1 className="profile__name">{currentUserInfo.name}</h1>
          <p className="profile__profession">{currentUserInfo.about}</p>
          <button className="profile__edit-button" type="button" onClick={onEditProfile}><img className="profile__edit-button-img" src={profEditButton} alt="редактировать профиль" /></button>
        </div>
      </div>
      <button className="profile__add-button" type="button" onClick={onAddPlace}>
        <img className="profile__add-button-img" src={addButton} alt="добавить карточку" />
      </button>
    </section>

    <section className="section-elements">
      <ul className="elements-list">
        {cards.map((card) => (
          <Card 
            key={card._id}
            card={card} 
            onCardClick={onCardClick}
            onCardLike={onCardLike}
            onCardDelete={onCardDelete}
          />
        ))}
      </ul>
    </section>
  </main>
  );
}

export default Main;
