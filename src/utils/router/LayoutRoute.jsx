import { Outlet } from "react-router-dom";
import BasketWindow from "../../components/Basket/BasketWindow";
import ScrollButton from "../../components/Btns/ScrollButton";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import Navbar from "../../components/Navbar/Navbar";
import ScrollToTop from "../../tools/routeScrollToTop";

function LayoutRoute() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
      <ScrollButton />
      <BasketWindow />
      <Navbar />
      <ScrollToTop />
    </>
  );
}

export default LayoutRoute;
