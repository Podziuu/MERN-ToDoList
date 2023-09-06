import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { useCheckAuthQuery } from "../store/slices/userApiSlice";

const PrivateRoute = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { data } = useCheckAuthQuery();
  return data?.isAuthenticated && userInfo ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace />
  );
};

export default PrivateRoute;
