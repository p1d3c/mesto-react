import React, { useEffect } from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import api from '../utils/api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import AddPlacePopup from './AddPlacePopup';

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);

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
    .then(() => {
      setCards((cards) => cards.filter(с => с._id !== card._id));
    })
    .catch((err) => {
      console.log(err);
    })
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
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null)
  }

  function handleCardClick(card) {
    setSelectedCard(card)
  }

  function handleUpdateUser({ name, about }) {
    api.setUserInfo({ name, about })
    .then((res) => {
      setCurrentUser({
        ...currentUser,
        name: res.name,
        about: res.about
      })
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      closeAllPopups();
    })
  }

  function handleUpdateAvatar({ avatar }) {
    api.changeAvatar({ avatarPopupInputValue: avatar })
    .then((res) => {
      setCurrentUser({
        ...currentUser,
        avatar: res.avatar
      })
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      closeAllPopups();
    })
  }

  function handleAddPlace({ name, link }) {
    api.addCard({ name, link})
    .then((newCard) => {
      setCards([newCard, ...cards])
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      closeAllPopups();
    })
  }

  useEffect(() => {
    api.getInitialCards()
    .then((res) => {
      setCards(res)
    })
    .catch((err) => {
      console.log(err);
    })
  }, [])

  useEffect(() => {
    api.getUserInfo()
    .then((res) => {
      setCurrentUser({
        name: res.name,
        about: res.about,
        avatar: res.avatar,
        id: res._id,
        cohort: res.cohort
      })
    })
    .catch((err) => {
      console.log(err);
    })
  }, [])

  useEffect(() => {
    const handleEscClose = (evt) => {
      if (evt.key === "Escape") {
        closeAllPopups();
      }
    };

    document.addEventListener('keydown', handleEscClose);

    return () => {
      document.removeEventListener('keydown', handleEscClose);
    }
  }, [])

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header />
        <Main
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        onCardClick={handleCardClick}
        cards={cards}
        onCardLike={handleCardLike}
        onCardDelete={handleCardDelete}
        />

        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser}/>

        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlace} />

        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />

        <PopupWithForm name="del-confirm" title="Вы уверены?" onClose={closeAllPopups}>
          <button type="submit" className="popup__submit" name="del-confirm-submit">Да</button>
        </PopupWithForm>

        <ImagePopup card={selectedCard} onClose={closeAllPopups}></ImagePopup>

        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
