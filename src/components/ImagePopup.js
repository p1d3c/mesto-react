import React from 'react';

class ImagePopup extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <section className={`popup popup_type_img ${this.props.card ? `popup_opened` : ''}`}>
        <div className="popup__overlay" onClick={this.props.onClose}></div>
        <div className="popup__content">
          <img className="popup__image" src={`${this.props.card ? this.props.card.link : '#'}`} alt={`${this.props.card ? this.props.card.name : '#'}`} />
          <button className="popup__close-btn" type="button" name="img-close" onClick={this.props.onClose}></button>
          <h2 className="popup__caption">{`${this.props.card ? this.props.card.name : ''}`}</h2>
        </div>
      </section>
    );
  }
}

export default ImagePopup;
