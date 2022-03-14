function Card(props) {

  function handleClick() {
    props.onCardClick(props.cardInfo);
  }

  return (
    <div className="element">
      <button type="button" className="element__button"></button>
      <img src={props.cardInfo.link} alt={props.cardInfo.name} className="element__image" onClick={handleClick} />
      <div className="element__text">
        <h2 className="element__title">{props.cardInfo.name}</h2>
        <div className="element__likes-container">
          <button className="element__heart" type="button" name="heart"></button>
          <span className="element__likes-count"></span>
        </div>
      </div>
    </div>
  )
}

export default Card;
