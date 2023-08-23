import Field from "../../Field";

function LoginFrom({register, errors}) {
  return (
    <>
    <Field 
        name="email" 
        label="Емейл" 
        type="email" 
        register={register} 
        errors={errors}/>
    <Field 
        name="password" 
        label="Пароль" 
        type="password" 
        min={8} 
        mes='Мінімум 8 символів' 
        register={register} 
        errors={errors}/>
    </>
  );
}

export default LoginFrom;
