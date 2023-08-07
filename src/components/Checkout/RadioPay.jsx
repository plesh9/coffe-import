import { useDispatch, useSelector } from "react-redux";
import { setSelectedPayRadio } from "../../state/reducers/newOrderReducer";

function RadioPay( { option } ) {
  const { selectedPayRadio } = useSelector((state) => state.newOrder);
  const dispatch = useDispatch()

  const onChangeRadioPay = (e) => {
    dispatch(setSelectedPayRadio(e.target.value))
  }

  return (
    <div className="custom-radio__wrapper">
      <div className="custom-radio">
        <input
          id={option.id}
          name='pay'
          type="radio"
          value={option.title}
          checked={selectedPayRadio === option.title}
          onChange={e => onChangeRadioPay(e)}
        />
        <label htmlFor={option.id}>{option.title}</label>
      </div>
      {selectedPayRadio === option.title ? 
        <div>
          <p className="custom-radio__descr">{option.descr}</p>
        </div> : "" 
      }
    </div>
  );
}

export default RadioPay;
