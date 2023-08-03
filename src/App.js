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
import { closeLoader, openLoader, scrollLock } from "./tools/subFunctions";
import CategotyList from "./components/Categories/CategoryList";
import CatalogList from "./components/Categories/CatalogList";
import BasketWindow from "./components/Basket/BasketWindow";
import NotFound from "./components/NotFound";
import Navbar from "./components/Navbar/Navbar";
import Checkout from "./components/Checkout/Checkout";
import Thanks from "./components/Thanks";
import axios from "axios";

function App() {
  const shop = useSelector((state) => state.shop)
  const dispatch = useDispatch()
  const m_12 = useMediaQuery("(min-width: 1201px)");
  console.log(shop);

  // get shop on load
  useEffect(() => {
    openLoader(dispatch)
    dispatch(getShop()).then(() => {
      closeLoader(dispatch)
    })
  }, [])

  if (shop.isLoading) {
    return <Loader />
  }

  return (
    <div className="app">
      <Routes>
          <Route path="/*" element={<MainApp m_12={m_12} /> } />
          <Route path="/checkout" element={<><Checkout /><Footer /></> } />
          <Route path="/thanks" element={<Thanks   /> } />
      </Routes>
    </div>

  );
}

function MainApp ({ m_12 }) {
  return (
      <div className="App">
        <Header />
        <main>
            <Routes>
              <Route path="/" element={<Main m_12={m_12} />} />
              <Route path="/catalog" element={<CatalogList itemsPerPage={32} pagination={true} />} />
              <Route path="/catalog/:catalogPath" element={<CategotyList itemsPerPage={32} pagination={true} />} />
              <Route path="/catalog/:catalogPath/:categoryId" element={<PaginatedItems itemsPerPage={m_12 ? 32 : 16} pagination={true} />} />
              <Route path="/*" element={<NotFound title="На жаль, такої сторінки немає :(" /> } />
            </Routes>
        </main>
        <Footer />
        <ScrollButton />
        <BasketWindow />
        <Navbar />
      </div>
  )
}

export default App;
