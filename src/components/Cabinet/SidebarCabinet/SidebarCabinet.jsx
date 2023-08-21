import { NavLink } from "react-router-dom";
import { cabinetRoutes } from "./linksRoute";
import LinkSidebar from "./LinkSidebar";
import ProfileSidebar from "./ProfileSidebar";
import { IoMdExit } from "react-icons/io";

function SidebarCabinet({ isOpen, openModal }) {
  return (
    <aside className="cabinet__sidebar sidebar-cabient">
      <ul className="sidebar-cabient__list">
        {cabinetRoutes?.map((route, i) => (
          <li key={i} className={`${route.className ? route.className : ""}`}>
            <NavLink
              to={route.path}
              className={({ isActive }) =>
                isActive
                  ? `sidebar-cabient__btn _active ${
                      route.className ? route.className : ""
                    }`
                  : `sidebar-cabient__btn ${
                      route.className ? route.className : ""
                    }`
              }
            >
              {route.profile ? (
                <ProfileSidebar />
              ) : (
                <LinkSidebar route={route} />
              )}
            </NavLink>
          </li>
        ))}
        <li>
          <button
            type="button"
            onClick={openModal}
            className={`sidebar-cabient__btn ${isOpen ? "_disabled" : ""}`}
          >
            <i className="sidebar-cabient__icon">
              <IoMdExit />
            </i>
            <span>Вийти</span>
          </button>
        </li>
      </ul>
    </aside>
  );
}

export default SidebarCabinet;
