import React from 'react';

class ImagePopup extends React.Component {

  render() {
    return (
      <section className="popup popup_type_img">
        <div className="popup__overlay"></div>
        <div className="popup__content">
          <img className="popup__image" src="#" alt="#" />
          <button className="popup__close-btn" type="button" name="img-close"></button>
          <h2 className="popup__caption"></h2>
        </div>
      </section>
    );
  }
}

export default ImagePopup;
