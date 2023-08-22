import { useSelector } from "react-redux";
import Field from "../../../../Field";

function UserFields({ register, errors }) {
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
    </>
  );
}

export default UserFields;
