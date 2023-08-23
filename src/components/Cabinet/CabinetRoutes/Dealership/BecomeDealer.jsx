import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { MdOutlineError } from "react-icons/md";

function BecomeDealer() {
  const { user } = useSelector((state) => state.auth);

  return (
    <>
      <h1 className="cabinet__title title title-secondary">
        ЯК СТАТИ НОВИМ ПАРТНЕРОМ ІНТЕРНЕТ МАГАЗИНУ COFFE IMPORT?
      </h1>
      <h2 className="dealership__subtitle">
        На початку співпраці з нами, на умовах дропшипінгу, вам потрібно:
      </h2>
      <ul className="dealership__list">
        <li>
          Крок 1: Мати власний кабінет, тобто зареєструватися як клієнт на
          сайті;
        </li>
        <li className={`${!user.isActivated ? "_unActivated" : ""}`}>
          {!user.isActivated ? (
            <>
              <MdOutlineError /> Крок 2:{" "}
              <a
                href="http://mail.google.com/mail/."
                rel="noreferrer"
                target="_blank"
              >
                Підтвердити
              </a>{" "}
              електронну пошту
            </>
          ) : (
            "Крок 2: Підтвердити електронну пошту;"
          )}
        </li>
        {user.isActivated && (
          <li>
            Крок 3: Натиснути кнопку
            <NavLink to="/new-dealer">'Стати дилером'</NavLink>, підтвердити
            особистий запис та встановити прапорець. Все готово!
          </li>
        )}
      </ul>
      <div className="dealership__confirm">
        {user.isActivated && (
          <NavLink to="/new-dealer" className="dealership__btn btn">
            Стати дилером
          </NavLink>
        )}
      </div>
    </>
  );
}

export default BecomeDealer;
