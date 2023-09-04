import "./_main.scss";
import "swiper/swiper-bundle.min.css";
import AllcategoryBtn from "../Btns/AllcategoryBtn";
import MainSwiper from "./Swiper";
import Actions from "./Actions";
import MainProducts from "./MainComponents/MainProducts";
import MainCategory from "./MainComponents/MainCategory";

function Main({ m_12 }) {
  return (
    <div className="main__wrapper">
      <div className="swiper__container">
        <MainSwiper />
        {!m_12 && (<AllcategoryBtn />)}
        <Actions />
      </div>
      <MainCategory />
      <div className="main__items items-main">
        <div className="items-main__container">
          <h2 className="items-main__title title">Онлайн-консультант</h2>
          <ul className="items-main__list">
            <li className="items-main__itm">
              <a href="#" className="items-main__link">
                <div className="items-main__img">
                  <img
                    src="https://st5.depositphotos.com/62628780/65482/i/600/depositphotos_654825172-stock-photo-isolated-woman-call-center-and.jpg"
                    alt=""
                  />
                </div>
                <p className="items-main__text">В мене є питання</p>
              </a>
            </li>
            <li className="items-main__itm">
              <a href="#" className="items-main__link">
                <div className="items-main__img">
                  <img
                    className="contain"
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQ6fCRhm1-g2ggWVzkn0xI-s8fAz850teipg&usqp=CAU"
                    alt=""
                  />
                </div>
                <p className="items-main__text">Як користуватися?</p>
              </a>
            </li>
            <li className="items-main__itm">
              <a href="#" className="items-main__link">
                <div className="items-main__img">
                  <img
                    src="https://st5.depositphotos.com/62628780/65482/i/600/depositphotos_654825172-stock-photo-isolated-woman-call-center-and.jpg"
                    alt=""
                  />
                </div>
                <p className="items-main__text">В мене є питання</p>
              </a>
            </li>
            <li className="items-main__itm">
              <a href="#" className="items-main__link">
                <div className="items-main__img">
                  <img
                    className="contain"
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQ6fCRhm1-g2ggWVzkn0xI-s8fAz850teipg&usqp=CAU"
                    alt=""
                  />
                </div>
                <p className="items-main__text">Як користуватися?</p>
              </a>
            </li>
            <li className="items-main__itm">
              <a href="#" className="items-main__link">
                <div className="items-main__img">
                  <img
                    src="https://st5.depositphotos.com/62628780/65482/i/600/depositphotos_654825172-stock-photo-isolated-woman-call-center-and.jpg"
                    alt=""
                  />
                </div>
                <p className="items-main__text">В мене є питання</p>
              </a>
            </li>
            <li className="items-main__itm">
              <a href="#" className="items-main__link">
                <div className="items-main__img">
                  <img
                    className="contain"
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQ6fCRhm1-g2ggWVzkn0xI-s8fAz850teipg&usqp=CAU"
                    alt=""
                  />
                </div>
                <p className="items-main__text">Як користуватися?</p>
              </a>
            </li>
            <li className="items-main__itm">
              <a href="#" className="items-main__link">
                <div className="items-main__img">
                  <img
                    src="https://st5.depositphotos.com/62628780/65482/i/600/depositphotos_654825172-stock-photo-isolated-woman-call-center-and.jpg"
                    alt=""
                  />
                </div>
                <p className="items-main__text">В мене є питання</p>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <MainProducts />
      <div className="main__help help-main">
        <div className="help-main__container">
          <h2 className="help-main__title title">Допомога</h2>
          <ul className="help-main__list">
            <li className="help-main__item">
              <a href="#" className="help-main__link">
                Питання та відповіді
              </a>
            </li>
            <li className="help-main__item">
              <a href="#" className="help-main__link">
                Поради
              </a>
            </li>
            <li className="help-main__item">
              <a href="#" className="help-main__link">
                Відеоінструкція
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="main__info info-main">
        <div className="info-main__container">
          <div className="info-main__box">
            <h4 className="info-main__title">Купити кофемашину в Україні</h4>
            <div className="info-main__info">
              <p>
                Ми - лідери продажів на ринку. Вже багато років компанія
                залишається на лідерських позиціях, завдяки новим технологіям,
                широкому асортименту продукції та постійно вводячи щось нове у
                своє виробництво, щоб покупець мав із чого вибрати та
                задовольнити свої потреби. Продукція представлена ​​на всіх
                континентах світу.
              </p>
              <ul className="info-main__list">
                <li className="info-main__item">якість</li>
                <li className="info-main__item">доступність</li>
                <li className="info-main__item">надійність</li>
              </ul>
              <p>Продукція виготовлена ​​лише з якісних матеріалів.</p>
            </div>
          </div>
          <div className="info-main__box">
            <h4 className="info-main__title">Купити кофемашину в Україні</h4>
            <div className="info-main__info">
              <p>
                Ми - лідери продажів на ринку. Вже багато років компанія
                залишається на лідерських позиціях, завдяки новим технологіям,
                широкому асортименту продукції та постійно вводячи щось нове у
                своє виробництво, щоб покупець мав із чого вибрати та
                задовольнити свої потреби. Продукція представлена ​​на всіх
                континентах світу.
              </p>
              <ul className="info-main__list">
                <li className="info-main__item">якість</li>
                <li className="info-main__item">доступність</li>
                <li className="info-main__item">надійність</li>
              </ul>
              <p>Продукція виготовлена ​​лише з якісних матеріалів.</p>
            </div>
          </div>
          <div className="info-main__box">
            <h4 className="info-main__title">Купити кофемашину в Україні</h4>
            <div className="info-main__info">
              <p>
                Ми - лідери продажів на ринку. Вже багато років компанія
                залишається на лідерських позиціях, завдяки новим технологіям,
                широкому асортименту продукції та постійно вводячи щось нове у
                своє виробництво, щоб покупець мав із чого вибрати та
                задовольнити свої потреби. Продукція представлена ​​на всіх
                континентах світу.
              </p>
              <ul className="info-main__list">
                <li className="info-main__item">якість</li>
                <li className="info-main__item">доступність</li>
                <li className="info-main__item">надійність</li>
              </ul>
              <p>Продукція виготовлена ​​лише з якісних матеріалів.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;
