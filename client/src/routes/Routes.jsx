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
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/blood-requests",
        element: <BloodRequestDashboard />,
      },
      {
        path: "/request-blood",
        element: <RequestBlood />,
      },
      {
        path: "/register-donor",
        element: <RegisterDonor />,
      },
      {
        path: "/hospitals",
        element: <Hospitals />,
      },
      {
        path: "/organizations",
        element: <Organizations />,
      },
    ],
  },
]);

export default router;
