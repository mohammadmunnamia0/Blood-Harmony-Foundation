import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const DonationProcess = () => {
  const navigate = useNavigate();

  const steps = [
    {
      number: "01",
      title: "Registration",
      description:
        "Complete a donor registration form with your personal information and medical history.",
      icon: "📝",
    },
    {
      number: "02",
      title: "Screening",
      description:
        "A quick physical examination including blood pressure, temperature, and hemoglobin check.",
      icon: "🔍",
    },
    {
      number: "03",
      title: "Donation",
      description:
        "The actual donation takes about 8-10 minutes. You'll donate approximately one pint of blood.",
      icon: "💉",
    },
    {
      number: "04",
      title: "Recovery",
      description:
        "Rest for 10-15 minutes and enjoy refreshments to help your body recover.",
      icon: "☕",
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
            The Donation Process
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Donating blood is simple and safe. Here's what you can expect during
            your donation journey.
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-red-200 hidden md:block"></div>

          <div className="space-y-12">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`relative flex flex-col md:flex-row items-center gap-8 ${
                  index % 2 === 0 ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Timeline dot */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-red-600 rounded-full hidden md:block"></div>

                <div className="w-full md:w-1/2">
                  <div className="bg-white rounded-xl p-8 shadow-lg">
                    <div className="flex items-center gap-4 mb-4">
                      <span className="text-4xl">{step.icon}</span>
                      <div>
                        <span className="text-sm font-semibold text-red-600">
                          {step.number}
                        </span>
                        <h3 className="text-xl font-bold text-gray-900">
                          {step.title}
                        </h3>
                      </div>
                    </div>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="bg-white rounded-xl p-8 shadow-lg max-w-2xl mx-auto">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Ready to Donate?
            </h3>
            <p className="text-gray-600 mb-6">
              The entire process takes about an hour, including registration,
              screening, donation, and recovery. Your donation can save up to
              three lives!
            </p>
            <button
              onClick={() => navigate("/register-donor")}
              className="bg-red-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-red-700 transition-colors"
            >
              Register As A Donor
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DonationProcess;
