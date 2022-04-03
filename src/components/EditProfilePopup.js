import React, { useEffect } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import PopupWithForm from './PopupWithForm';

function EditProfilePopup(props) {
  const currentUser = React.useContext(CurrentUserContext);

  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescChange(e) {
    setDescription(e.target.value);
  }

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser])

  return (
    <PopupWithForm name="edit" title="Редактировать профиль" isOpen={props.isOpen} onClose={props.onClose}>
      <label className="popup__form-field">
        <input id="name-input" type="text" className="popup__input popup__input_type_name" value={name} onChange={handleNameChange} name="name" placeholder="Имя" minLength="2" maxLength="40" required />
        <span className="popup__input-error name-input-error"></span>
      </label>
      <label className="popup__form-field">
        <input id="job-input" type="text" className="popup__input popup__input_type_job" value={description} onChange={handleDescChange} name="desc" placeholder="Описание" minLength="2" maxLength="200" required />
        <span className="popup__input-error job-input-error"></span>
      </label>
      <button type="submit" className="popup__submit" name={`edit-submit`}>Сохранить</button>
    </PopupWithForm>
  )
}

export default EditProfilePopup;
