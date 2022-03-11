export const token = '1fc6d210-8890-4051-a715-d0338c476cfd';

export const editBtn = document.querySelector('.profile__edit-btn');
export const addBtn = document.querySelector('.profile__add-btn');
export const avatarBtn = document.querySelector('.profile__edit-pen');

export const profilePopupElement = document.querySelector('.popup_type_edit');
export const addCardPopupElement = document.querySelector('.popup_type_add');
export const imgPopupElement = document.querySelector('.popup_type_img');
export const delCardPopupElement = document.querySelector('.popup_type_del-confirm');
export const avatarPopupElement = document.querySelector('.popup_type_avatar');

export const profNameSelector = '.profile__title';
export const profJobSelector = '.profile__subtitle';
export const profAvatarSelector = '.profile__avatar';
export const profilePopupName = document.querySelector('.popup__input_type_name');
export const profilePopupJob = document.querySelector('.popup__input_type_job');

export const editFormElementSelector = '.popup__form_type_edit';
export const editSubmitBtn = document.querySelector('button[name="edit-submit"]');
export const nameInput = document.querySelector('.popup__input_type_name');
export const jobInput = document.querySelector('.popup__input_type_job');

export const addFormElementSelector = '.popup__form_type_add';
export const addSubmitBtn = document.querySelector('button[name="add-submit"]');
export const titleInput = document.querySelector('.popup__input_type_title');
export const linkInput = document.querySelector('.popup__input_type_image');

export const delConfirmSubmitBtn = document.querySelector('button[name="del-confirm-submit"]');

export const avatarFormElementSelector = '.popup__form_type_avatar';
export const avatarSubmitBtn = document.querySelector('button[name="avatar-submit"]');

export const cardListSelector = '.elements';

export const templateSelector = '#temp';

export
function renderLoadingText(button, btnTextBefore, btnTextAfter, isLoading) {
  if (isLoading) {
    button.textContent = btnTextAfter;
  } else {
    button.textContent = btnTextBefore;
  }
};
