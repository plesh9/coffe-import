import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./login.scss";
import Loader from "../Loader"
import Logo from "../Logo"
import { useForm } from "react-hook-form";
import RegisterFrom from "./Forms/RegisterForm";
import LoginFrom from "./Forms/LoginForm";
import { useAuth } from "../../hooks/useAuth";
import { NavLink, useLocation } from "react-router-dom";
import { useEffect } from "react";

function Login() {
  const location = useLocation()
  const [registerMode, setRegisterMode] = useState(location?.pathname === '/registration')
  const { register, handleSubmit, watch, formState: { errors, isValid }, reset } = useForm({mode: "onBlur"});
  const { onLogin, onRegister, isLoading } = useAuth()

  useEffect(() => {
    setRegisterMode(location?.pathname === '/registration')
  }, [location.pathname])

  function onSubmit(data) {
    if (data.confirmPassword) {
      return onRegister(data)
    }
    onLogin(data)
  }

  if (isLoading) {
    return <Loader />
  }

  return (
    <div className="login">
      <div className={`login__container ${registerMode ? 'login__container-rAnim' : 'login__container-lAnim'}`}>
        <form className="login__form" onSubmit={handleSubmit(onSubmit)}>
          <Logo className='login__logo' />
          <h1 className="login__title">{registerMode ? 'Реєстрація' : 'Вхід'}</h1>
          <p className="login__subtitle">
            {registerMode 
              ? 'Створіть обліковий запис та отримайте доступ до особистого кабінету.' 
              : 'Авторизуйтеся, щоб отримати доступ до вашого облікового запису.'
            }
          </p>
          <div className="login__fields">
          {registerMode ? 
            <RegisterFrom register={register} errors={errors} watch={watch}  /> 
            : <LoginFrom register={register} errors={errors} />}
          </div>
          <div className="login__submit">
            <button 
              type="submit" 
              className={`login__btn btn ${!isValid ? '_disabled' : ''}`}
            >
            {registerMode ? "Регістрація" : 'Увійти'}
            </button>
          </div>
          <p className="login__redirect">
            {registerMode ? 'Вже маєте обліковий запис?' : 'Відсутній обліковий запис?'} <br />
            {registerMode 
              ? <NavLink to='/login'>Увійти!</NavLink>
              : <NavLink to='/registration'>Зареєструйтеся!</NavLink>
            }
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
