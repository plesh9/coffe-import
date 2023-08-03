function CardItem({ currentItem, onByProduct }) {
  return (
      <div className="cards-main__item">
        <div className="cards-main__actions">
          <div className="cards-main__action cards-main__action-sale">
            Акція -50%
          </div>
          <div className="cards-main__action cards-main__action-top">
            Топ продажу
          </div>
        </div>
        <a href="#" className="cards-main__img">
          <img src={currentItem?.imgUrl} alt="" />
        </a>
        <a href="#" className="cards-main__title">
          <span>{currentItem?.title}</span>
        </a>
        <div className="cards-main__info">
          <p>{currentItem?.description}</p>
        </div>
        <div className="cards-main__box">
          <div className="cards-main__rating">
            <span className="cards-main__star cards-main__star-active"></span>
            <span className="cards-main__star cards-main__star-active"></span>
            <span className="cards-main__star cards-main__star-active"></span>
            <span className="cards-main__star cards-main__star-active"></span>
            <span className="cards-main__star"></span>
          </div>
          <a href="#" className="cards-main__response">
            Написати відгук
          </a>
        </div>
        <div className="cards-main__prices">
          <div className="cards-main__price cards-main__price-old">
            {currentItem?.price} ₴
          </div>
          <div className="cards-main__price cards-main__price-new">
            {currentItem?.price} ₴
          </div>
        </div>
        <button className="cards-main__btn btn" onClick={() => onByProduct(currentItem)}>Купити</button>
      </div>
  );
}

export default CardItem;
