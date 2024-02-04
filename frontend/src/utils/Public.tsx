import { Navigate, Outlet } from "react-router-dom";

const Public = () => {
  const auth = localStorage.getItem("auth");

  return auth ? <Navigate to="/" /> : <Outlet />;
};

export default Public;
