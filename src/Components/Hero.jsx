import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import image from "/Hero/hero.jpg"

const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-[80vh] bg-gradient-to-r from-red-600 to-red-800 text-white">
      <div className="absolute inset-0 bg-black/50"></div>
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
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
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="hidden md:block"
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
    </div>
  );
};

export default Hero;
