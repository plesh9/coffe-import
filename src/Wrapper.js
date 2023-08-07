import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getShop } from "./state/reducers/shopReducer";
import { Route, Routes } from "react-router-dom";
import "./Styles/scss/App.scss";
import useMediaQuery from "./tools/useMediaQuery";
import Footer from "./components/Footer/Footer";
import Loader from "./components/Loader";
import { closeLoader, openLoader, scrollLock, scrollUnlock } from "./tools/subFunctions";
import Checkout from "./components/Checkout/Checkout";
import App from "./App";

function Wrapper() {
  const shop = useSelector((state) => state.shop)
  const dispatch = useDispatch()
  const m_12 = useMediaQuery("(min-width: 1201px)");

  // get shop on load
  useEffect(() => {
    scrollLock()
    openLoader(dispatch)
    dispatch(getShop()).then(() => {
      closeLoader(dispatch)
      scrollUnlock()
    })
  }, [])

  if (shop.isLoading) {
    return <Loader />
  }

  return (
    <div className="wrapper">
      <Routes>
          <Route path="/*" element={<App m_12={m_12} /> } />
          <Route path="/checkout" element={<><Checkout /><Footer /></> } />
      </Routes>
    </div>

  );
}

export default Wrapper;
