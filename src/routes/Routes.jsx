import { createBrowserRouter } from "react-router-dom";
import Home from "../Pages/Home";
import Hospitals from "../Pages/Hospitals";
import Login from "../Pages/Login";
import Organizations from "../Pages/Organizations";
import RegisterDonor from "../Pages/RegisterDonor";
import Root from "../Layouts/Root";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/hospitals",
        element: <Hospitals />,
      },
      {
        path: "/organizations",
        element: <Organizations />,
      },
      {
        path: "/register-donor",
        element: <RegisterDonor />,
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
]);

export default router;
