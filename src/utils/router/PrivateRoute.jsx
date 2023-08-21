import { useSelector } from "react-redux";
import { Navigate, Outlet, useNavigate } from "react-router-dom";

function PrivateRoute() {
  const { isAuth } = useSelector((state) => state.auth);
  return (
    isAuth ? <Outlet /> : <Navigate to='/login' />
  )
}

export default PrivateRoute;
