import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import api from '../utils/api';
import Card from './Card';

class Main extends React.Component {
  static contextType = CurrentUserContext;
  constructor(props) {
    super(props);
    this.handleEditAvatarClick = props.onEditAvatar;
    this.handleEditProfileClick = props.onEditProfile;
    this.handleAddPlaceClick = props.onAddPlace;
    this.state = {
      cards: []
    }
  }

  componentDidMount() {
    api.getInitialCards()
    .then((res) => {
      this.setState({
        cards: res
      })
    })
    .catch((err) => {
      console.log(err);
    })
  }

  render() {
    return (
      <main>
        <section className="profile">
          <img src={this.context.avatar} alt="" className="profile__avatar" />
          <div className="profile__edit-pen" onClick={this.handleEditAvatarClick}></div>
          <div className="profile__info">
            <div className="profile__row">
              <h1 className="profile__title">{this.context.name}</h1>
              <button className="profile__edit-btn" onClick={this.handleEditProfileClick} type="button" name="edit"></button>
            </div>
            <p className="profile__subtitle">{this.context.about}</p>
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
        </section>
      </main>
    );
  }
}

export default Main;
