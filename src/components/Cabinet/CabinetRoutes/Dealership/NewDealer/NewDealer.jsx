import { useState } from "react";
import Loader from "../../../../Loader"
import Logo from "../../../../Logo"
import { useForm } from "react-hook-form";
import LoginForm from "../../../../Login/Forms/LoginForm";
import { useAuth } from "../../../../../hooks/useAuth";
import Field from "../../../../Field";
import Checkbox from "../../../../Checkbox";
import { useSelector } from "react-redux";
import { SELLER } from "../../../../../http/roles";

function NewDealer() {
  const [isChecked, setIsChecked] = useState(false)
  const { register, handleSubmit, formState: { errors, isValid }, reset } = useForm({mode: "onBlur"});
  const { onUpdateRole, isLoading } = useAuth()

  async function onSubmit(data) {
    await onUpdateRole({...data, role: SELLER})
    reset({checkbox: false})
    setIsChecked(false)
  }

  if (isLoading) {
    return <Loader />
  }
  return (
    <div className="login">
      <div className={`login__container`}>
        <form className="login__form" onSubmit={handleSubmit(onSubmit)}>
          <Logo className='login__logo' />
          <h1 className="login__title">Новий дилер</h1>
          <p className="login__subtitle">
            Підтвердіть особистий запис та встановить прапорець, щоб стати новим дилером!
          </p>
          <div className="login__fields">
            <LoginForm register={register} errors={errors} />
            <Checkbox 
              label="Я ознайомився з правилами та згоден стати дилером!" 
              register={register} 
              errors={errors}
              name='checkbox'
              isChecked={isChecked}
              setIsChecked={setIsChecked}
            />
          </div>
          <div className="login__submit">
            <button 
              type="submit" 
              className={`login__btn btn ${!isValid ? '_disabled' : ''}`}
            >
                Стати дилером
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NewDealer;
