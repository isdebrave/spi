import { Navigate, Outlet } from "react-router-dom";

const Private = () => {
  const auth = localStorage.getItem("auth");

  return !auth ? <Navigate to="/auth/login" /> : <Outlet />;
};

export default Private;
