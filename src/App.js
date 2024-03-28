import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getShop, setIsLoading } from "./state/reducers/shopReducer";
import { Navigate, Route, Routes } from "react-router-dom";
import "./Styles/scss/App.scss";
import useMediaQuery from "./tools/useMediaQuery";
import Loader from "./components/Loader";
import { scrollLock, scrollUnlock } from "./tools/subFunctions";
import Checkout from "./components/Checkout/Checkout";
import Login from "./components/Login/Login";
import LayoutRoute from "./utils/router/LayoutRoute";
import Categories from "./components/Shop/Categories/Categories";
import Catalog from "./components/Shop/Categories/Catalog";
import NotFound from "./components/NotFound";
import Products from "./components/Shop/Products/Products";
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
import Product from "./components/Shop/Product/Product";


function App() {
  const shop = useSelector(state => state.shop)
  const dispatch = useDispatch()
  const m_12 = useMediaQuery("(min-width: 1201px)");
  const { verify } = useAuth();
  
  useEffect(() => {
    const fetchShop = async () => {
      try {
        scrollLock();
        dispatch(setIsLoading(true));
        await dispatch(getShop());
        dispatch(setIsLoading(false));
        scrollUnlock();
      } catch (error) {
        console.log(error)
      }
    };
    
    fetchShop();
    verify();
  }, []);

  
  if (shop.isLoading) {
    return <Loader />
  }

  return (
    <div className="App">
      <Routes>
          <Route element={<LayoutRoute /> } >
            <Route path="/" element={<Main m_12={m_12} />} />
            <Route path="/catalog" element={<Catalog itemsPerPage={32} />} />
            <Route path="/catalog/:catalogPath" element={<Categories itemsPerPage={32} />} />
            <Route path="/catalog/:catalogPath/:categoryId" element={<Products itemsPerPage={m_12 ? 32 : 16} />} />
            <Route path="/product/:productId/*" element={<Product />} />
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

export default App;
