import React from "react";
import imageDelButton from '../images/del-button.svg';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({card, onCardClick, onCardLike, onCardDelete}) {
  const currentUserInfo = React.useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUserInfo._id;
  const cardDeleteButtonClassName = (
    `${isOwn ? 'element__del' : 'element__del_hidden'}`
  );

  const isLiked = card.likes.some(i => i._id === currentUserInfo._id);
  const cardLikeButtonClassName = `element__like-button ${isLiked && 'element__liked'}`; 

  const cardData = card;
  function handleCardClick() {
    onCardClick(cardData)
  }

  function handleLikeClick() {
    onCardLike(cardData)
  }

  function handleDeleteClick() {
    onCardDelete(cardData)
  }

  return (
    <li className="element">
      <button className="element__del-button" type="button" onClick={handleDeleteClick}><img className={cardDeleteButtonClassName} src={imageDelButton} alt="удалить" /></button>
      <img className="element__img" alt={card.name} src={card.link} onClick={handleCardClick}/>
      <div className="element__info">
        <h2 className="element__text">{card.name}</h2>
        <div className="element__like-element">
          <button className={cardLikeButtonClassName} type="button" onClick={handleLikeClick}></button>
          <p className="element__like-count">{card.likes.length}</p>
        </div>
      </div>
    </li>
  )      
}

export default Card;
