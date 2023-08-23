import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getShop, setIsLoading } from "./state/reducers/shopReducer";
import { Navigate, Route, Routes } from "react-router-dom";
import "./Styles/scss/app.scss";
import useMediaQuery from "./tools/useMediaQuery";
import Footer from "./components/Footer/Footer";
import Loader from "./components/Loader";
import { scrollLock, scrollUnlock } from "./tools/subFunctions";
import Checkout from "./components/Checkout/Checkout";
import Login from "./components/Login/Login";
import axios from 'axios'
import { checkAuth } from "./state/reducers/authReducer";
import LayoutRoute from "./utils/router/LayoutRoute";
import CategotyList from "./components/Categories/CategoryList";
import CatalogList from "./components/Categories/CatalogList";
import NotFound from "./components/NotFound";
import PaginatedItems from "./components/CardsList/productPage";
import Main from "./components/Main/Main";
import Thanks from "./components/Thanks";
import PrivateRoute from "./utils/router/PrivateRoute";
import Cabinet from "./components/Cabinet/Cabinet";
import Settings from "./components/Cabinet/CabinetRoutes/Settings/Settings";
import Orders from "./components/Cabinet/CabinetRoutes/Orders";
import Punct from "./components/Cabinet/CabinetRoutes/Punct";
import { useAuth } from "./hooks/useAuth";
import Dealership from "./components/Cabinet/CabinetRoutes/Dealership/Dealership";
import NewDealer from "./components/Cabinet/CabinetRoutes/Dealership/NewDealer/NewDealer";
import RegisterAdmin from "./components/RegisterAdmin/RegisterAdmin";

function Wrapper() {
  const shop = useSelector(state => state.shop)
  const dispatch = useDispatch()
  const m_12 = useMediaQuery("(min-width: 1201px)");
  const { verify } = useAuth();

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

    verify()
    
  }, [])

  // useEffect(() => {
  //   axios({
  //     method: 'post',
  //     url: `http://localhost:5000/api/login`,
  //     // withCredentials: true,
  //     params: {},
  //     data: JSON.stringify({
  //       email: 'game.plesh9@gmail.com',
  //       password: '12345678'
  //     }),
  //     headers: {
  //       "Content-Type": "application/json",
  //       'Access-Control-Allow-Credentials':true
  //     }
  //   }).then(response => console.log(response))
  // }, [])

  if (shop.isLoading) {
    return <Loader />
  }

  return (
    <div className="App">
      <Routes>
          <Route element={<LayoutRoute /> } >
            <Route path="/" element={<Main m_12={m_12} />} />
            <Route path="/catalog" element={<CatalogList itemsPerPage={32} pagination={true} />} />
            <Route path="/catalog/:catalogPath" element={<CategotyList itemsPerPage={32} pagination={true} />} />
            <Route path="/catalog/:catalogPath/:categoryId" element={<PaginatedItems itemsPerPage={m_12 ? 32 : 16} pagination={true} />} />
            <Route path="/thanks" element={<Thanks /> } />
            <Route path="*" element={<NotFound title="На жаль, такої сторінки немає :(" /> } />
            <Route element={<PrivateRoute /> }>
              <Route  element={<Cabinet /> }>
                <Route path="/cabinet" element={<Navigate to="/cabinet/personal-information" />} />
                <Route path="/cabinet/personal-information" element={<Settings />} />
                <Route path="/cabinet/orders" element={<Orders />} />
                <Route path="/cabinet/dealership" element={<Dealership />} />
                <Route path="/cabinet/applications" element={<Punct title='content 4' />} />
                <Route path="/cabinet/conditions" element={<Punct title='content 3' />} />
              </Route>
            </Route>
          </Route>
          <Route path="/checkout" element={<Checkout /> } />
          <Route path="/login" element={<Login /> } />
          <Route path="/registration" element={<Login /> } />
          <Route path="/new-dealer" element={<NewDealer /> } />
          <Route path="/new-admin" element={<RegisterAdmin /> } />
      </Routes>
    </div>
  );
}

export default Wrapper;
