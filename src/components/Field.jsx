import { useForm } from "react-hook-form";

function Field({ inpName, labelText, type="text", errorMes }) {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();

  return (
    <div className="field">
      <label htmlFor={inpName}>{labelText}</label>
      <input {...register(inpName)} type={type} className="field__input" />
      {errorMes ? <p className="field__invalid">{errorMes}</p> : ''}
    </div>
  );
}

export default Field;
