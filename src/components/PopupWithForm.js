import React from 'react';

class PopupWithForm extends React.Component {
  constructor(props) {
    super(props);
    this.title = props.title;
    this.name = props.name;
    this.children = props.children;
    this.openedPopupSelector = 'popup_opened';
  }

  render() {
    return (
      <section className={`popup popup_type_${this.name} ${this.props.isOpen ? `popup_opened` : ''}`}>
        <div className="popup__overlay" onClick={this.props.onClose}></div>
        <div className="popup__inner">
          <h2 className="popup__title">{this.title}</h2>
          <form className={`popup__form popup__form_type_${this.name}`} name={`${this.name}-form`} noValidate>
            <fieldset className="popup__form-set">
              {this.children}
              <button className="popup__close-btn" type="button" name={`${this.name}-close`} onClick={this.props.onClose}></button>
            </fieldset>
          </form>
        </div>
      </section>
    );
  }
}

export default PopupWithForm;
