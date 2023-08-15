import { Route, Routes } from "react-router-dom";
import CategotyList from "./components/Categories/CategoryList";
import CatalogList from "./components/Categories/CatalogList";
import BasketWindow from "./components/Basket/BasketWindow";
import NotFound from "./components/NotFound";
import Navbar from "./components/Navbar/Navbar";
import ScrollButton from "./components/Btns/ScrollButton";
import PaginatedItems from "./components/CardsList/productPage";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import Footer from "./components/Footer/Footer";
import Thanks from "./components/Thanks";

function App ({ m_12 }) {
    return (
        <div className="App">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<Main m_12={m_12} />} />
              <Route path="/catalog" element={<CatalogList itemsPerPage={32} pagination={true} />} />
              <Route path="/catalog/:catalogPath" element={<CategotyList itemsPerPage={32} pagination={true} />} />
              <Route path="/catalog/:catalogPath/:categoryId" element={<PaginatedItems itemsPerPage={m_12 ? 32 : 16} pagination={true} />} />
              <Route path="/thanks" element={<Thanks /> } />
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