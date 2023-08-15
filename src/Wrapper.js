import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getShop, setIsLoading } from "./state/reducers/shopReducer";
import { Route, Routes } from "react-router-dom";
import "./Styles/scss/app.scss";
import useMediaQuery from "./tools/useMediaQuery";
import Footer from "./components/Footer/Footer";
import Loader from "./components/Loader";
import { scrollLock, scrollUnlock } from "./tools/subFunctions";
import Checkout from "./components/Checkout/Checkout";
import App from "./App";
import Login from "./components/Login";
import ScrollToTop from "./tools/routeScrollToTop";

function Wrapper() {
  const shop = useSelector(state => state.shop)
  const dispatch = useDispatch()
  const m_12 = useMediaQuery("(min-width: 1201px)");

  // get shop on load
  useEffect(() => {
    scrollLock()
    dispatch(setIsLoading(true));
    document.documentElement.classList.add("no-scroll");
    dispatch(getShop()).then(() => {
      dispatch(setIsLoading(false));
      if (document.documentElement.classList.contains("no-scroll")) {
        document.documentElement.classList.remove("no-scroll");
      }
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
          <Route path="/login" element={<Login /> } />
      </Routes>
      <ScrollToTop />
    </div>

  );
}

export default Wrapper;
