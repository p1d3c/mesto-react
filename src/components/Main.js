import React, { useEffect } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import api from '../utils/api';
import Card from './Card';

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);

  const handleEditAvatarClick = props.onEditAvatar;
  const handleEditProfileClick = props.onEditProfile;
  const handleAddPlaceClick = props.onAddPlace;

  const [cards, setCards] = React.useState([]);

  useEffect(() => {
    api.getInitialCards()
    .then((res) => {
      setCards(res)
    })
    .catch((err) => {
      console.log(err);
    })
  }, [])

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser.id)

    api.changeLikeCardStatus({
      cardId: card._id,
      isLiked: !isLiked
    })
    .then((newCard) => {
      setCards((cards) => cards.map((c) => c._id === card._id ? newCard : c));
    })
    .catch((err) => console.log(err))
  }

  function handleCardDelete(card) {
    api.delCard({ cardId: card._id })
    .then((res) => {
      console.log(res)
      setCards((cards) => cards.filter(с => с._id !== card._id));
    })
    .catch((err) => {
      console.log(err);
    })
  }

  return (
    <main>
      <section className="profile">
        <img src={currentUser.avatar} alt="" className="profile__avatar" />
        <div className="profile__edit-pen" onClick={handleEditAvatarClick}></div>
        <div className="profile__info">
          <div className="profile__row">
            <h1 className="profile__title">{currentUser.name}</h1>
            <button className="profile__edit-btn" onClick={handleEditProfileClick} type="button" name="edit"></button>
          </div>
          <p className="profile__subtitle">{currentUser.about}</p>
        </div>
        <button className="profile__add-btn" onClick={handleAddPlaceClick} type="button" name="add"></button>
      </section>

      <section className="elements">
        {
          cards.map((card) => {
            return (
              <Card
              cardInfo={card}
              key={card._id}
              onCardClick={props.onCardClick}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete} />
            )
          })
        }
      </section>
    </main>
  );
}

export default Main;
