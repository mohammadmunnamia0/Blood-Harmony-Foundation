import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "./Modal";
import image from "/Hero/hero1.jpg";

const Hero = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  const handleRequestBlood = () => {
    if (isAuthenticated) {
      navigate("/request-blood");
    } else {
      setShowModal(true);
    }
  };

  return (
    <div className="relative lg:min-h-[90vh] bg-gradient-to-r from-red-600 to-red-800 text-white">
      <div className="absolute inset-0 "></div>
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center ">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Save Lives Through Blood Donation
            </h1>
            <p className="text-xl mb-8">
              Every drop counts. Join our mission to ensure a stable blood
              supply for those in need.
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => navigate("/register-donor")}
                className="bg-white text-red-600 px-8 py-3 rounded-full font-semibold hover:bg-red-50 transition-colors"
              >
                Donate Now
              </button>
              <button
                onClick={handleRequestBlood}
                className="bg-white text-red-600 px-8 py-3 rounded-full font-semibold hover:bg-red-50 transition-colors"
              >
                Request Blood
              </button>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className=" md:block"
          >
            <div className="relative">
              <div className="w-full h-[400px] rounded-lg overflow-hidden">
                {/* Add your hero image here */}
                <div className="w-full h-full  flex items-center justify-center">
                  <img className="rounded-xl" src={image} alt="" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        message="Please register first, then log in to request blood."
        buttonText="Register as Donor"
        buttonAction="/register-donor"
      />
    </div>
  );
};

export default Hero;
