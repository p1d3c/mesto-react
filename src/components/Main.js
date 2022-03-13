import React from 'react';
import api from '../utils/api';
import Card from './Card';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.handleEditAvatarClick = props.onEditAvatar;
    this.handleEditProfileClick = props.onEditProfile;
    this.handleAddPlaceClick = props.onAddPlace;
    this.state = {
      userName: null,
      userAvatar: null,
      userDescription: null,
      userId: null,
      cards: []
    }
  }

  componentDidMount() {
    api.getUserInfo()
    .then((res) => {
      this.setState({
        userName: res.name,
        userAvatar: res.avatar,
        userDescription: res.about,
        userId: res._id
      })
    })
    .catch((err) => {
      console.log(err);
    })

    api.getInitialCards()
    .then((res) => {
      this.setState({
        ...this.state,
        cards: res
      })
    })
  }

  render() {
    return (
      <main>
        <section className="profile">
          <img src={this.state.userAvatar} alt="" className="profile__avatar" />
          <div className="profile__edit-pen" onClick={this.handleEditAvatarClick}></div>
          <div className="profile__info">
            <div className="profile__row">
              <h1 className="profile__title">{this.state.userName}</h1>
              <button className="profile__edit-btn" onClick={this.handleEditProfileClick} type="button" name="edit"></button>
            </div>
            <p className="profile__subtitle">{this.state.userDescription}</p>
          </div>
          <button className="profile__add-btn" onClick={this.handleAddPlaceClick} type="button" name="add"></button>
        </section>

        <section className="elements">
          {
            this.state.cards.map((card) => {
              return (
                <Card cardInfo={card} key={card._id} onCardClick={this.props.onCardClick} />
              )
            })
          }
          <template id="temp">
            <div className="element">
              <button type="button" className="element__button"></button>
              <img src="#" alt="#" className="element__image" />
              <div className="element__text">
                <h2 className="element__title"></h2>
                <div className="element__likes-container">
                  <button className="element__heart" type="button" name="heart"></button>
                  <span className="element__likes-count"></span>
                </div>
              </div>
            </div>
          </template>
        </section>
      </main>
    );
  }
}

export default Main;
