import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import FieldsSettings from "./FieldsSettings";
import { useAuth } from "../../../../hooks/useAuth";
import Loader from "../../../Loader"
import {MdOutlineError} from "react-icons/md"


function Settings() {
  const { register, handleSubmit, watch, formState: { errors, isValid }, reset } = useForm({ mode: "onBlur" });
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch()
  const { onUpdate, isLoading } = useAuth()

  const onSubmit = async (data) => {
    if (!user.isActivated){
      return alert('Для продовження потрібно підтвердити пошту!')
    }

    const updatetUser = {
      id: user.id,
      email: data.email, 
      firstname: data.firstname, 
      lastname: data.lastname,
      newPassword: data.newPassword,
      oldPassword: data.oldPassword
    }
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
        <p>Необхідно здійснити <a href="http://mail.google.com/mail/." target='_blank'>активацію</a> облікового запису.</p>
      </div> : '' }
      <h1 className="cabinet__title title title-secondary">Персональна інформація</h1>
      <form className="settings-cabinet__form" onSubmit={handleSubmit(onSubmit)} >
        <FieldsSettings register={register} errors={errors} watch={watch} />
        <div className="settings-cabinet__submit"><button className="settings-cabinet__btn btn">Зберегти</button></div>
      </form>
    </div>
  );
}

export default Settings;
