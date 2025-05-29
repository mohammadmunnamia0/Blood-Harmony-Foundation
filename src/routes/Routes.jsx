import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import DonorProfile from "../pages/DonorProfile";
import Home from "../pages/Home";
import Hospitals from "../pages/Hospitals";
import Organizations from "../pages/Organizations";
import RequestBlood from "../pages/RequestBlood";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/donor-profile",
        element: <DonorProfile />,
      },
      {
        path: "/request-blood",
        element: <RequestBlood />,
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
