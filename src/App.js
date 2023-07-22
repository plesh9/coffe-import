import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "./state/reducers/productsReducer";
import { Route, Routes } from "react-router-dom";
import "./Styles/scss/App.scss";
import useMediaQuery from "./tools/useMediaQuery";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import Footer from "./components/Footer/Footer";
import ScrollButton from "./components/Btns/ScrollButton";
import PaginatedItems from "./components/CardsList/productPage";
import Loader from "./components/Loader";

function App() {
  const products = useSelector((state) => state.products)
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(true)
  console.log(products);
  // const {getProducts} = bindActionCreators(actionCreators, dispatch)
  // console.log(AC);
  const m_12 = useMediaQuery("(min-width: 1201px)");
  // get products on load
  useEffect(() => {
    setIsLoading(true)
    dispatch(getProducts()).then((result) => {
      setIsLoading(false)
    })
  }, [])
  return (
    <>
    {isLoading ? <Loader /> :
      <div className="App">
        <Header m_12={m_12} />
        <main>
            <Routes>
              <Route path="*" element={<Main m_12={m_12} />} />
              <Route path="/cardsList" element={<PaginatedItems itemsPerPage={m_12 ? 32 : 16} pagination={true} />} />
            </Routes>
        </main>
        <Footer />
        <ScrollButton />
      </div>}
    </>
  );
}

export default App;
