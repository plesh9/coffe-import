import {MdError} from 'react-icons/md';
import InputMask from "react-input-mask";

function CheckoutFields({ errors, register,  }) {
    return ( 
        <div className="form-checkout__fields">
                <div className="field">
                    <label htmlFor='lastname' className={`field__label ${errors?.lastname ? '_invalid' : '' }`}>Прізвище</label>
                    <input {...register('lastname', {
                        required: true, 
                        minLength: {value: 2, message: "Мінімум 2 букви"},
                        })}
                        className={`field__input ${errors?.lastname ? '_invalid' : '' }`} 
                    />
                    {errors?.lastname ? <p className="field__invalid"><MdError />
                    {errors?.lastname?.message || "Поле обов'язкове до заповення"}</p> : ''}
                </div>
                <div className="field">
                    <label htmlFor='firstname' className={`field__label ${errors?.firstname ? '_invalid' : '' }`}>Ім'я</label>
                    <input {...register('firstname', {
                        required: true, 
                        minLength: {value: 2, message: "Мінімум 2 букви"}
                        })}
                        className={`field__input ${errors?.firstname ? '_invalid' : '' }`}
                    />
                    {errors?.firstname ? <p className="field__invalid"><MdError />
                    {errors?.firstname?.message || "Поле обов'язкове до заповення"}</p> : ''}
                </div>
                <div className="field">
                    <label htmlFor='phone' className={`field__label ${errors?.phone ? '_invalid' : '' }`}>Мобільний телефон</label>
                    <InputMask {...register('phone', {
                            required: true,
                            minLength: {value: 19, message: 'Номер телефону вказаний не вірно'} 
                        })} 
                        // onBlur={(e) => onMaslBlur(e)}
                        mask={"+38 (999) 999-99-99"}
                        maskPlaceholder=''
                        className={`field__input ${errors?.phone ? '_invalid' : '' }`} 
                    />
                    {errors?.phone ? <p className="field__invalid"><MdError />{errors?.phone?.message || "Поле обов'язкове до заповення"}</p> : ''}
                </div>
                <div className="field">
                    <label htmlFor='email' className={`field__label ${errors?.email ? '_invalid' : '' }`}>Електронна пошта</label>
                    <input {...register('email', {
                        required: true,
                        minLength: {value: 2, message: "Мінімум 2 букви"}
                        })} 
                        type='email' 
                        className={`field__input ${errors?.email ? '_invalid' : '' }`}
                    />
                    {errors?.email ? <p className="field__invalid"><MdError />
                    {errors?.email?.message || "Поле обов'язкове до заповення"}</p> : ''}
                </div>
            </div>
     );
}

export default CheckoutFields;