import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import UserFields from "./FieldsSettings/UserFields";
import { useAuth } from "../../../../hooks/useAuth";
import Loader from "../../../Loader"
import {MdOutlineError} from "react-icons/md"
import { useState } from "react";
import PasswordFields from "./FieldsSettings/PasswordFields";


function Settings() {
  const { register, handleSubmit, watch, formState: { errors, isValid }, reset } = useForm({ mode: "onBlur" });
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch()
  const { onUpdate, isLoading } = useAuth()
  const [passwordMode, setPasswordMode] = useState(false)

  const handleChangePasswordMode = () => {
    setPasswordMode(prev => !prev)
    reset()
  }

  const onSubmitForm = async (data) => {
    if (!user.isActivated){
      return alert('Для продовження потрібно підтвердити пошту!')
    }
    console.log(data)

    const updatetUser = {
      id: user.id,
      email: data.email || user.email, 
      firstname: data.firstname || user.firstname, 
      lastname: data.lastname || user.lastname,
      newPassword: data.newPassword,
      oldPassword: data.oldPassword
    }
    // console.log(updatetUser)
    await onUpdate(updatetUser)
    reset()
  };

  if (isLoading) {
    return <Loader />
  }

  return (
    <div className="settings-cabinet">
      {!user.isActivated ? 
      <div className="settings-cabinet__warning">
        <i><MdOutlineError /></i>
        <p>Необхідно здійснити <a href="http://mail.google.com/mail/." target='_blank'  rel="noreferrer">активацію</a> облікового запису.</p>
      </div> : '' }
      <h1 className="cabinet__title title title-secondary">{passwordMode ? "Безпека" : "Персональна інформація"}</h1>
      <form className="settings-cabinet__form" onSubmit={handleSubmit(onSubmitForm)} >
        <div className="settings-cabinet__fields" >
          {passwordMode 
            ? <PasswordFields register={register} errors={errors} watch={watch} /> 
            : <UserFields register={register} errors={errors} />
          }
        </div>
        <div className="settings-cabinet__change">
          <button type="button" onClick={handleChangePasswordMode}>
            {passwordMode ? "Персональна інформація" : "Змінити пароль"}
          </button>
        </div>
        <div className="settings-cabinet__submit"><button className="settings-cabinet__btn btn">Зберегти</button></div>
      </form>
    </div>
  );
}

export default Settings;
