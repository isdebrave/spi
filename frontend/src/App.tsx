import { createBrowserRouter, RouterProvider } from "react-router-dom";

import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import Login from "./pages/Login";

import Private from "./utils/Private";
import Public from "./utils/Public";

const router = createBrowserRouter([
  {
    errorElement: <NotFound />,
    children: [
      {
        element: <Private />,
        children: [{ path: "/", element: <Home /> }],
      },
      {
        element: <Public />,
        children: [{ path: "/auth/login", element: <Login /> }],
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
