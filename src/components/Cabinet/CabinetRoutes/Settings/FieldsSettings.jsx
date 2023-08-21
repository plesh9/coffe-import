import { useSelector } from "react-redux";
import Field from "../../../Field";

function FieldsSettings({ register, errors, watch }) {
  const { user } = useSelector((state) => state.auth);

  return (
    <>
      <Field
        name="firstname"
        label="Ім'я"
        register={register}
        errors={errors}
        value={user.firstname}
      />
      <Field
        name="lastname"
        label="Прізвище"
        register={register}
        errors={errors}
        value={user.lastname}
      />
      <Field
        name="email"
        label="Емейл"
        type="email"
        register={register}
        errors={errors}
        value={user.email}
      />
      <Field
        name="oldPassword"
        label="Старий пароль"
        type="password"
        min={8}
        mes="Мінімум 8 символів"
        register={register}
        required={false}
        errors={errors}
      />
      <Field
        name="newPassword"
        label="Новий пароль"
        type="password"
        min={8}
        mes="Мінімум 8 символів"
        register={register}
        required={false}
        errors={errors}
      />
      <Field
        name="confirmPassword"
        label="Підтвердити новий пароль"
        type="password"
        register={register}
        required={false}
        errors={errors}
        validation="newPassword"
        validationMessage="Невірно вказаний пароль!"
        watch={watch}
      />
    </>
  );
}

export default FieldsSettings;
