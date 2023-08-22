import Field from "../../../../Field";

function PasswordFields({ register, errors, watch }) {
  return (
    <>
      <Field
        name="oldPassword"
        label="Старий пароль"
        type="password"
        min={8}
        mes="Мінімум 8 символів"
        register={register}
        errors={errors}
      />
      <Field
        name="newPassword"
        label="Новий пароль"
        type="password"
        min={8}
        mes="Мінімум 8 символів"
        register={register}
        errors={errors}
      />
      <Field
        name="confirmPassword"
        label="Підтвердити новий пароль"
        type="password"
        register={register}
        errors={errors}
        validation="newPassword"
        validationMessage="Невірно вказаний пароль!"
        watch={watch}
      />
    </>
  );
}

export default PasswordFields;
