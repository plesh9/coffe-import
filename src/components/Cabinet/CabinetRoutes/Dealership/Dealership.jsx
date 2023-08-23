import { useSelector } from "react-redux";
import { SELLER } from "../../../../http/roles";
import BecomeDealer from "./BecomeDealer";
import ContentDealership from "./ContentDealership";

function Dealership() {
  const { user } = useSelector((state) => state.auth);
  return (
    <div className="dealership">
      <div className="dealership__container">
        {user.role === SELLER ? <ContentDealership /> : <BecomeDealer />}
      </div>
    </div>
  );
}

export default Dealership;
