import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useModal } from "../../hooks/useModal";
import Loader from "../Loader";
import Logout from "./CabinetRoutes/Logout";
import "./cabinet.scss";
import SidebarCabinet from "./SidebarCabinet/SidebarCabinet";
import { useEffect } from "react";
import { checkAuth, setLoading } from "../../state/reducers/authReducer";
import { scrollLock, scrollUnlock } from "../../tools/subFunctions";

function Cabinet() {
  const { onLogout, isLoading, verify } = useAuth();
  const { openModal, closeModal, closeModalOnClickOut, isOpen } = useModal();

  useEffect(() => {
    verify()
  }, [])

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="cabinet">
      <div className="cabinet__container">
        <SidebarCabinet openModal={openModal} isOpen={isOpen} />
        <div className="cabinet__content">
          <Outlet />
        </div>
        <Logout
          closeModal={closeModal}
          closeModalOnClickOut={closeModalOnClickOut}
          isOpen={isOpen}
          onLogout={onLogout}
        />
      </div>
    </div>
  );
}

export default Cabinet;
