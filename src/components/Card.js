import { CurrentUserContext } from '../contexts/CurrentUserContext';
import React from 'react';

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);

  const isOwn = props.cardInfo.owner._id === currentUser._id
  const cardDeleteButtonClassName = (
    `element__button ${isOwn ? '' : 'element__button_hidden'}`
  )

  const isLiked = props.cardInfo.likes.some(item => item._id === currentUser._id)
  const cardLikeButtonClassName = (
    `element__heart ${isLiked ? 'element__heart_active' : ''}`
  )

  function handleClick() {
    props.onCardClick(props.cardInfo);
  }

  return (
    <div className="element">
      <button type="button" className={cardDeleteButtonClassName}></button>
      <img src={props.cardInfo.link} alt={props.cardInfo.name} className="element__image" onClick={handleClick} />
      <div className="element__text">
        <h2 className="element__title">{props.cardInfo.name}</h2>
        <div className="element__likes-container">
          <button className={cardLikeButtonClassName} type="button" name="heart"></button>
          <span className="element__likes-count"></span>
        </div>
      </div>
    </div>
  )
}

export default Card;
