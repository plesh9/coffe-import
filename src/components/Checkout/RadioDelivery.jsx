import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedDeliveryRadio, setSelectedDelivery, setDeliveryValid } from "../../state/reducers/newOrderReducer";
import CourierForm from "./CourierForm";
import Select from "./Select";

function RadioDelivery({ option }) {
  const { selectedDeliveryRadio, selectedDelivery, deliveryValid, warehouses } = useSelector((state) => state.newOrder);
  const dispatch = useDispatch();

  const [showSelect, setShowSelect] = useState(true);
  const [courierMode, setCourierMode] = useState(false);
  const [filterWarehouse, setFilterWarehouse] = useState(warehouses);

  const onChangeRadio = (e) => {
    dispatch(setSelectedDeliveryRadio(e.target.value));
    setSelectedDelivery(null);
  };

  useEffect(() => {
    dispatch(setDeliveryValid(true))

    switch (option.id) {
      case "delivery-postomat":
        return setFilterWarehouse(warehouses?.filter(warehous => warehous.CategoryOfWarehouse === "Postomat"));

      case "delivery-branch":
        return setFilterWarehouse(warehouses?.filter(warehous => warehous.CategoryOfWarehouse !== "Postomat"));

      case "delivery-courier":
        setShowSelect(false);
        setCourierMode(true);
        return;

      default: break;
    }
  }, [warehouses]);

  return (
    <>
      <div className="custom-radio__wrapper">
        <div className="custom-radio">
          <input
            id={option.id}
            name="delivery"
            type="radio"
            value={option.title}
            checked={selectedDeliveryRadio === option.title && true}
            onChange={e => onChangeRadio(e, option)}
          />
          <label htmlFor={option.id}>{option.title}</label>
        </div>
        {selectedDeliveryRadio === option.title ? 
          <div>
            <p className="custom-radio__descr">{option.descr}</p>
            {showSelect ? 
              <Select
                name="delivery"
                error='Оберіть правильний пункт'
                label={false}
                placeholder="Виберіть відповідне відділення"
                items={filterWarehouse}
                selectedOption={selectedDelivery}
                setSelectedOption={setSelectedDelivery}
                setSelectValid={setDeliveryValid}
                selectValid={deliveryValid}
                general={true}
                min={0}
                validation={false}
              /> : ''
            }
            {courierMode ? <CourierForm /> : ''}
          </div> : ''
        }
      </div>
    </>
  );
}

export default RadioDelivery;
