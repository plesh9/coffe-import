import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getShop } from "./state/reducers/shopReducer";
import { Route, Routes } from "react-router-dom";
import "./Styles/scss/App.scss";
import useMediaQuery from "./tools/useMediaQuery";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import Footer from "./components/Footer/Footer";
import ScrollButton from "./components/Btns/ScrollButton";
import PaginatedItems from "./components/CardsList/productPage";
import Loader from "./components/Loader";
import { closeLoader, openLoader } from "./tools/subFunctions";
import CategotyList from "./components/Categories/CategoryList";

function App() {
  const shop = useSelector((state) => state.shop)
  const dispatch = useDispatch()
  console.log(shop);
  const m_12 = useMediaQuery("(min-width: 1201px)");

  // get shop on load
  useEffect(() => {
    openLoader(dispatch)
    dispatch(getShop()).then(() => {
      closeLoader(dispatch)
    })
  }, [])

  return (
    <>
    {shop.isLoading ? <Loader /> :
      <div className="App">
        <Header m_12={m_12} />
        <main>
            <Routes>
              <Route path="/" element={<Main m_12={m_12} />} />
              <Route path="/products/:categoryId" element={<PaginatedItems itemsPerPage={m_12 ? 32 : 16} pagination={true} />} />
              <Route path="/catalog" element={<CategotyList itemsPerPage={m_12 ? 32 : 16} pagination={true} />} />
            </Routes>
        </main>
        <Footer />
        <ScrollButton />
      </div>}
    </>
  );
}

export default App;
