import React, { useEffect } from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import api from '../utils/api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState({});

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
        <Main onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} onCardClick={handleCardClick} />
        <PopupWithForm name="edit" title="Редактировать профиль" isOpen={isEditProfilePopupOpen} onClose={closeAllPopups}>
          <label className="popup__form-field">
            <input id="name-input" type="text" className="popup__input popup__input_type_name" name="name" placeholder="Имя" minLength="2" maxLength="40" required />
            <span className="popup__input-error name-input-error"></span>
          </label>
          <label className="popup__form-field">
            <input id="job-input" type="text" className="popup__input popup__input_type_job" name="desc" placeholder="Описание" minLength="2" maxLength="200" required />
            <span className="popup__input-error job-input-error"></span>
          </label>
          <button type="submit" className="popup__submit" name={`edit-submit`}>Сохранить</button>
        </PopupWithForm>

        <PopupWithForm name="add" title="Новое место" isOpen={isAddPlacePopupOpen} onClose={closeAllPopups}>
          <label className="popup__form-field">
            <input id="title-input" type="text" className="popup__input popup__input_type_title" name="name" placeholder="Название" minLength="2" maxLength="30" required />
            <span className="popup__input-error title-input-error"></span>
          </label>
          <label className="popup__form-field">
            <input id="url-input" type="url" className="popup__input popup__input_type_image" name="link" placeholder="Ссылка на картинку" required />
            <span className="popup__input-error url-input-error"></span>
          </label>
          <button type="submit" className="popup__submit" name="add-submit">Создать</button>
        </PopupWithForm>

        <PopupWithForm name="avatar" title="Обновить аватар" isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups}>
          <label className="popup__form-field">
            <input id="avatar-input" type="url" className="popup__input popup__input_type_avatar" name="avatar" placeholder="Ссылка" required />
            <span className="popup__input-error avatar-input-error"></span>
          </label>
          <button type="submit" className="popup__submit" name="avatar-submit">Сохранить</button>
        </PopupWithForm>

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
