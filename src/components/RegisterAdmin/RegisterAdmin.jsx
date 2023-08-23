import { useState } from "react";
import Loader from "../Loader";
import Logo from "../Logo";
import { useForm } from "react-hook-form";
import { useAuth } from "../../hooks/useAuth";
import { useSelector } from "react-redux";
import RegisterForm from "../Login/Forms/RegisterForm"
import Field from "../Field";

function RegisterAdmin() {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm({ mode: "onBlur" });
  const { onAddAdmin, isLoading } = useAuth();

  async function onSubmit(data) {
    onAddAdmin(data)
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="login">
      <div className={`login__container`}>
        <form className="login__form" onSubmit={handleSubmit(onSubmit)}>
          <Logo className="login__logo" />
          <h1 className="login__title">Реєстрація нового адміністратора</h1>
          <p className="login__subtitle">
            Створіть обліковий запис та отримайте доступ до особистого кабінету
            адміністратора
          </p>
          <div className="login__fields">
            <RegisterForm register={register} errors={errors} watch={watch} />
            <Field
              name="key"
              label="Секретний ключ"
              type="password"
              register={register}
              errors={errors}
            />
          </div>
          <div className="login__submit">
            <button
              type="submit"
              className={`login__btn btn ${!isValid ? "_disabled" : ""}`}
            >
              Реєстрація адміністратора
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegisterAdmin;
