import { LinksSidebarArray } from "./LinksSidebarArray";
import { LinksSidebarAdminArray } from "./LinksSidebarAdminArray";
import LinkSidebar from "./LinkSidebar";
import ProfileSidebar from "./ProfileSidebar";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";


function SidebarPublic() {
  const { user } = useSelector(state => state.auth)
  const links = user.role === 'Admin' ? LinksSidebarAdminArray : LinksSidebarArray
  return (
    <>
      {links?.map((route, i) => (
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
            {route.profile ? <ProfileSidebar /> : <LinkSidebar route={route} />}
          </NavLink>
        </li>
      ))}
    </>
  );
}

export default SidebarPublic;
