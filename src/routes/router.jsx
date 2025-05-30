import { createBrowserRouter } from "react-router-dom";
import Root from "../layouts/Root";
import BloodRequestDashboard from "../pages/BloodRequestDashboard";
import Home from "../pages/Home";
import Hospitals from "../pages/Hospitals";
import Login from "../pages/Login";
import Organizations from "../pages/Organizations";
import RegisterDonor from "../pages/RegisterDonor";
import RequestBlood from "../pages/RequestBlood";

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
      {
        path: "/request-blood",
        element: <RequestBlood />,
      },
      {
        path: "/blood-requests",
        element: <BloodRequestDashboard />,
      },
    ],
  },
]);

export default router;
