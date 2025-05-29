import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const WhyDonate = () => {
  const navigate = useNavigate();

  const reasons = [
    {
      title: "Save Lives",
      description:
        "One donation can save up to three lives. Your blood could be the difference between life and death for someone in need.",
      icon: "❤️",
    },
    {
      title: "Regular Need",
      description:
        "Every 2 seconds, someone in the world needs blood. Regular donations ensure a stable supply.",
      icon: "⏰",
    },
    {
      title: "Quick Process",
      description:
        "The entire donation process takes only about an hour, and the actual donation takes just 8-10 minutes.",
      icon: "⚡",
    },
    {
      title: "Health Benefits",
      description:
        "Donating blood can help reduce iron levels in your body and may lower the risk of heart disease.",
      icon: "🏥",
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Why Donate Blood?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Your donation can make a significant impact on someone's life.
            Here's why your contribution matters.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="text-4xl mb-4">{reason.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {reason.title}
              </h3>
              <p className="text-gray-600">{reason.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div
            onClick={() => navigate("/register-donor")}
            className="inline-block bg-red-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-red-700 transition-colors cursor-pointer"
          >
            Become a Donor Today
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyDonate;
