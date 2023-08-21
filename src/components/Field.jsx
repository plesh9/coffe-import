import {MdOutlineError} from "react-icons/md"
function Field({ 
  name, label, type="text", value, required=true, min=0, mes, register, errors, 
  validation=null, validationMessage='do no match', watch }) {

  return (
    <div className="field">
      <label 
        htmlFor={name}
        className={`field__label ${errors[name] ? '_invalid' : ''}`}
      >
        {label}
      </label>
      <input {...register(name, {
        required: required, 
        value: value && value,
        minLength: {value: min, message: mes},
        validate: (val) => {
          if (!validation) return

          if (watch(validation) != val) {
            return validationMessage;
          }
        }
        })} 
        type={type} 
        className={`field__input ${errors[name] ? '_invalid' : ''}`} 
      />
      {errors[name] && <p className="field__invalid">
        <MdOutlineError />
        {errors[name]?.message ?  errors[name]?.message :`Поле обов'язкове до заповнення`}
      </p>}
    </div>
  );
}

export default Field;
