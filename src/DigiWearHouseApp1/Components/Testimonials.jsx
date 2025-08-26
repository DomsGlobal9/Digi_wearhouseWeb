import React from "react";
import { FaChartBar, FaUsers, FaStar } from "react-icons/fa";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Sree",
      title: "Textile Shop Owner",
      feedback:
        "Managing my textile business became so much easier with DVYB. Online orders and customer management boosted my monthly revenue significantly.",
    },
    {
      name: "Arjun",
      title: "Electronics Retailer",
      feedback:
        "DVYB helped me track my inventory in real-time and reduced stockouts by 40%. My customers are happier than ever.",
    },
    {
      name: "Meena",
      title: "Bakery Owner",
      feedback:
        "The easy-to-use dashboard lets me see daily sales instantly. I love how simple yet powerful DVYB is.",
    },
    {
      name: "Rahul",
      title: "Mobile Accessories Seller",
      feedback:
        "I never imagined growing this fast. With DVYB, I reached more customers online and doubled my monthly sales.",
    },
    {
      name: "Priya",
      title: "Boutique Owner",
      feedback:
        "The local language support made it super easy for me and my staff. DVYB feels like it’s made just for Indian businesses.",
    },
  ];

  return (
    <section className="w-full bg-gradient-to-b from-white to-blue-50 py-16 px-6 md:px-20">
      <div className="max-w-6xl mx-auto text-center">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold text-blue-900">
          Powerful Features for Indian Businesses
        </h2>
        <p className="text-gray-600 mt-2">
          Everything you need to digitize and grow your business, designed
          specifically for Indian market needs.
        </p>

        {/* Feature Card */}
        <div className="mt-12 flex justify-center">
          <div className="relative bg-gradient-to-br from-blue-500 to-blue-700 text-white p-6 rounded-2xl shadow-lg w-80">
            <FaChartBar size={30} className="mb-3" />
            <h3 className="font-semibold text-lg">Real-time Analytics</h3>
            <p className="text-sm mt-2">
              Track sales, inventory levels, and profits in real-time with
              beautiful dashboards.
            </p>
            <button className="mt-4 bg-white text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition">
              Try Feature →
            </button>

            {/* Floating Shape Placeholder */}
            <div className="absolute -top-6 -right-6 w-16 h-16 bg-blue-200 rounded-full opacity-30"></div>
          </div>
        </div>

        {/* Vendor Stats */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-gray-800">
            Why Vendors Love <span className="text-blue-600">DVYB</span>
          </h3>
          <p className="text-gray-600 mt-1">
            Join thousands of successful vendors who transformed their business.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-8">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-700">3,157+</p>
              <p className="text-gray-600 text-sm">Active Vendors</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">₹47Cr+</p>
              <p className="text-gray-600 text-sm">Monthly Sales</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-yellow-500 flex items-center justify-center gap-1">
                4.8/5 <FaStar className="text-yellow-400" />
              </p>
              <p className="text-gray-600 text-sm">App Rating</p>
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="relative bg-blue-50 border border-blue-100 rounded-2xl shadow-md p-6 text-left"
            >
              {/* Decorative random shapes alternating */}
              {idx % 2 === 0 ? (
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-blue-200 rounded-full opacity-30"></div>
              ) : (
                <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-blue-300 rotate-45 opacity-20"></div>
              )}

              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                <div>
                  <p className="font-semibold text-gray-800">{t.name}</p>
                  <p className="text-sm text-gray-500">{t.title}</p>
                </div>
              </div>
              <p className="text-gray-700 italic">“{t.feedback}”</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
