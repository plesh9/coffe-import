import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedDelivery, setStreet, setHome, setApartment} from "../../state/reducers/newOrderReducer";

function CourierForm() {
  const { selectedDeliveryRadio, street, home, apartment } = useSelector((state) => state.newOrder);
  const dispatch = useDispatch()

  const [validStreet, setValidSteet] = useState(true);
  const [validHome, setValidHome] = useState(true);
  const [validapartment, setValidapartment] = useState(true);

  const onChangeStreet = (e) => {
    dispatch(setStreet(e.target.value));
  };
  const onChangeHome = (e) => {
    dispatch(setHome(e.target.value));
  };
  const onChangeapartment = (e) => {
    dispatch(setApartment(e.target.value));
  };

  const onBlurStreet = (e) => {
    if (!e.target.value) {
      return setValidSteet(false);
    }
    setValidSteet(true);
  };
  const onBlurHome = (e) => {
    if (!e.target.value) {
      return setValidHome(false);
    }
    setValidHome(true);
  };
  const onBlurapartment = (e) => {
    if (!e.target.value) {
      return setValidapartment(false);
    }
    setValidapartment(true);
  };

  useEffect(() => {
    dispatch(setStreet(""));
    dispatch(setHome(""));
    dispatch(setApartment(""));
    setValidSteet(true);
    setValidHome(true);
    setValidapartment(true);
    dispatch(setSelectedDelivery(null));
  }, [selectedDeliveryRadio]);

  useEffect(() => {
    if (street && home && apartment) {
      dispatch(setSelectedDelivery({ street, home, apartment }));
    }
    if (!street || !home || !apartment) {
      dispatch(setSelectedDelivery(null));
    }
  }, [street, home, apartment]);

  return (
    <div className="form-checkout__courier">
      <div className="field">
        <input
          value={street}
          onChange={onChangeStreet}
          onBlur={onBlurStreet}
          placeholder="Вулиця"
          className={`field__input ${!validStreet ? "_invalid" : ""}`}
        />
      </div>
      <div className="field">
        <input
          value={home}
          onChange={onChangeHome}
          onBlur={onBlurHome}
          placeholder="Будинок"
          className={`field__input ${!validHome ? "_invalid" : ""}`}
        />
      </div>
      <div className="field">
        <input
          value={apartment}
          onChange={onChangeapartment}
          onBlur={onBlurapartment}
          placeholder="Квартира"
          className={`field__input ${!validapartment ? "_invalid" : ""}`}
        />
      </div>
    </div>
  );
}

export default CourierForm;
