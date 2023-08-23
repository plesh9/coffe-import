import { IoMdExit } from "react-icons/io";
import SidebarPublic from "./SidebarPublic";

function SidebarCabinet({ isOpen, openModal }) {
  return (
    <aside className="cabinet__sidebar sidebar-cabient">
      <ul className="sidebar-cabient__list">
      <SidebarPublic />
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
