import { motion } from "framer-motion";

const BloodTypes = () => {
  const bloodTypes = [
    {
      type: "A+",
      description: "Can donate to A+ and AB+",
      canReceive: ["A+", "A-", "O+", "O-"],
      color: "bg-red-500",
    },
    {
      type: "A-",
      description: "Can donate to A+, A-, AB+, AB-",
      canReceive: ["A-", "O-"],
      color: "bg-red-600",
    },
    {
      type: "B+",
      description: "Can donate to B+ and AB+",
      canReceive: ["B+", "B-", "O+", "O-"],
      color: "bg-red-400",
    },
    {
      type: "B-",
      description: "Can donate to B+, B-, AB+, AB-",
      canReceive: ["B-", "O-"],
      color: "bg-red-700",
    },
    {
      type: "AB+",
      description: "Universal recipient",
      canReceive: ["All blood types"],
      color: "bg-red-300",
    },
    {
      type: "AB-",
      description: "Can donate to AB+ and AB-",
      canReceive: ["AB-", "A-", "B-", "O-"],
      color: "bg-red-800",
    },
    {
      type: "O+",
      description: "Can donate to A+, B+, AB+, O+",
      canReceive: ["O+", "O-"],
      color: "bg-red-200",
    },
    {
      type: "O-",
      description: "Universal donor",
      canReceive: ["O-"],
      color: "bg-red-900",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Understanding Blood Types
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Learn about different blood types and their compatibility. Your
            blood type determines who you can donate to and receive from.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {bloodTypes.map((bloodType, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div
                className={`${bloodType.color} text-white rounded-t-xl p-6 text-center`}
              >
                <h3 className="text-3xl font-bold mb-2">{bloodType.type}</h3>
                <p className="text-sm opacity-90">{bloodType.description}</p>
              </div>
              <div className="bg-gray-50 rounded-b-xl p-6 border border-gray-100">
                <h4 className="font-semibold text-gray-900 mb-2">
                  Can Receive From:
                </h4>
                <ul className="text-sm text-gray-600">
                  {bloodType.canReceive.map((type, i) => (
                    <li key={i} className="mb-1">
                      {type}
                    </li>
                  ))}
                </ul>
              </div>
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
          <div className="bg-gradient-to-r from-red-50 to-red-100 rounded-xl p-8 max-w-2xl mx-auto shadow-lg border border-red-200">
            <h3 className="text-2xl font-bold text-red-700 mb-4 flex">
              <span className="mr-2">💡</span>
              Did You Know?
            </h3>
            <p className="text-gray-700 text-lg leading-relaxed">
              Type O- blood is known as the universal donor because it can be
              given to patients of any blood type. Type AB+ blood is known as
              the universal recipient because it can receive blood from any
              type.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default BloodTypes;
