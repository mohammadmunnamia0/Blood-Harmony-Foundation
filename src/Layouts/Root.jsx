import { Outlet } from "react-router-dom";
import Footer from "../Components/Shared/Footer";
import Navbar from "../Components/Shared/Navbar";
const Root = () => {
 
  return (
    <div>
      <Navbar></Navbar>
      <div className='min-h-[calc(100vh-60px)]'>
        <Outlet></Outlet>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Root;
