import Field from "../../Field";

function LoginFrom({ register, errors, watch }) {
  return (
    <>
      <Field
        name="firstname"
        label="Ім'я"
        register={register}
        errors={errors}
      />
      <Field
        name="lastname"
        label="Прізвище"
        register={register}
        errors={errors}
      />
      <Field
        name="email"
        label="Емейл"
        type="email"
        register={register}
        errors={errors}
      />
      <Field
        name="password"
        label="Пароль"
        type="password"
        min={8}
        mes="Мінімум 8 символів"
        register={register}
        errors={errors}
      />
      <Field
        name="confirmPassword"
        label="Підтвердити пароль"
        type="password"
        register={register}
        errors={errors}
        validation="password"
        validationMessage="Невірно вказаний пароль!"
        watch={watch}
      />
    </>
  );
}

export default LoginFrom;
