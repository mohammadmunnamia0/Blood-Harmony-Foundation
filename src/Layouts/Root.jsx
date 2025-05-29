import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import Nav from "../components/Nav";
import Foot from "../components/foot";
import WelcomeModal from "../components/WelcomeModal";

const Root = () => {
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);

  useEffect(() => {
    // For testing, let's force show the modal
    setShowWelcomeModal(true);

  }, []);

  return (
    <div>
      <div className="h-16">
        <Nav></Nav>
      </div>
      <div className='min-h-[calc(100vh-120px)]'>
        <Outlet></Outlet>
      </div>
      <Foot></Foot>
      {showWelcomeModal && (
        <WelcomeModal onClose={() => setShowWelcomeModal(false)} />
      )}
    </div>
  );
};

export default Root;
