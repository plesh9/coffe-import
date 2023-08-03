import "./_footer.scss";
import { BsFillGeoAltFill } from "react-icons/bs";
import { BsFillTelephoneFill } from "react-icons/bs";
import { GrMail } from "react-icons/gr";
import { AiFillInstagram } from "react-icons/ai";
import { BsFacebook } from "react-icons/bs";
import { FaTelegram } from "react-icons/fa";
import Logo from "../Logo";

function Footer() {
  return (
    <footer className="footer-distributed">
      <div className="footer__container">
        <div className="footer-left">
          <Logo className="footer__logo" />
          <p className="footer-company-about">
            <span>About the company</span>
            Lorem ipsum dolor sit amet, consectateur adispicing elit. Fusce
            euismod convallis velit, eu auctor lacus vehicula sit amet.
          </p>

        </div>

        <div className="footer-center">
        <div className="footer-links">
            <a href="#" className="link-1">
              Акції
            </a>

            <a href="#">Дропшипінг</a>

            <a href="#">Доставка | Оплата</a>

            <a href="#">Гарантія | Повернення</a>

            <a href="#">Графік роботи | Контакти</a>
          </div>
        </div>

        <div className="footer-right">
        <div className="footer__box-cont">
            <div className="footer__box">
              <div className="fa__info fa-map-marker">
                <BsFillGeoAltFill />
              </div>
              <a href="https://goo.gl/maps/8vRVLvNVtHYjaAqb8" target='_blank'>
                Проспект Василя Порика 9, Kyiv, Ukraine, 04215
              </a>
            </div>
            
            <div className="footer__box">
              <div className="fa__info fa-map-marker">
                <BsFillTelephoneFill />
              </div>
              <a className="footer__num" href="tel: 380000000000">380000000000</a>
            </div>
            
            <div className="footer__box">
              <div className="fa__info fa-map-marker">
                <GrMail />
              </div>
              <p>
                <a href="mailto:support@company.com">support@company.com</a>
              </p>
            </div>
          </div>

          <div className="footer-icons">
            <a href="https://instagram.com/coffee_import.kyiv?igshid=MzRlODBiNWFlZA==" target="_blank">
              <AiFillInstagram />
            </a>
            <a href="#" target="_blank">
              <BsFacebook />
            </a>
            <a href="#" target="_blank">
              <FaTelegram />
            </a>
          </div>
        </div>
        <p className="footer-company-name">
            © 2011–2023 Інтернет магазин coffe-import. Всі права захищені.
          </p>
      </div>
    </footer>
  );
}

export default Footer;
