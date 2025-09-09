// import React from "react";
// import { FaChartBar, FaUsers, FaStar } from "react-icons/fa";

// const Testimonials = () => {
//   const testimonials = [
//     {
//       name: "Sree",
//       title: "Textile Shop Owner",
//       feedback:
//         "Managing my textile business became so much easier with DVYB. Online orders and customer management boosted my monthly revenue significantly.",
//     },
//     {
//       name: "Arjun",
//       title: "Electronics Retailer",
//       feedback:
//         "DVYB helped me track my inventory in real-time and reduced stockouts by 40%. My customers are happier than ever.",
//     },
//     {
//       name: "Meena",
//       title: "Bakery Owner",
//       feedback:
//         "The easy-to-use dashboard lets me see daily sales instantly. I love how simple yet powerful DVYB is.",
//     },
//     {
//       name: "Rahul",
//       title: "Mobile Accessories Seller",
//       feedback:
//         "I never imagined growing this fast. With DVYB, I reached more customers online and doubled my monthly sales.",
//     },
//     {
//       name: "Priya",
//       title: "Boutique Owner",
//       feedback:
//         "The local language support made it super easy for me and my staff. DVYB feels like it’s made just for Indian businesses.",
//     },
//   ];

//   return (
//     <section className="w-full bg-gradient-to-b from-white to-blue-50 py-16 px-6 md:px-20">
//       <div className="max-w-6xl mx-auto text-center">
//         {/* Heading */}
//         <h2 className="text-3xl md:text-4xl font-bold text-blue-900">
//           Powerful Features for Indian Businesses
//         </h2>
//         <p className="text-gray-600 mt-2">
//           Everything you need to digitize and grow your business, designed
//           specifically for Indian market needs.
//         </p>

//         {/* Feature Card */}
//         <div className="mt-12 flex justify-center">
//           <div className="relative bg-gradient-to-br from-blue-500 to-blue-700 text-white p-6 rounded-2xl shadow-lg w-80">
//             <FaChartBar size={30} className="mb-3" />
//             <h3 className="font-semibold text-lg">Real-time Analytics</h3>
//             <p className="text-sm mt-2">
//               Track sales, inventory levels, and profits in real-time with
//               beautiful dashboards.
//             </p>
//             <button className="mt-4 bg-white text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition">
//               Try Feature →
//             </button>

//             {/* Floating Shape Placeholder */}
//             <div className="absolute -top-6 -right-6 w-16 h-16 bg-blue-200 rounded-full opacity-30"></div>
//           </div>
//         </div>

//         {/* Vendor Stats */}
//         <div className="mt-16">
//           <h3 className="text-2xl font-bold text-gray-800">
//             Why Vendors Love <span className="text-blue-600">DVYB</span>
//           </h3>
//           <p className="text-gray-600 mt-1">
//             Join thousands of successful vendors who transformed their business.
//           </p>

//           <div className="mt-6 flex flex-wrap justify-center gap-8">
//             <div className="text-center">
//               <p className="text-2xl font-bold text-blue-700">3,157+</p>
//               <p className="text-gray-600 text-sm">Active Vendors</p>
//             </div>
//             <div className="text-center">
//               <p className="text-2xl font-bold text-green-600">₹47Cr+</p>
//               <p className="text-gray-600 text-sm">Monthly Sales</p>
//             </div>
//             <div className="text-center">
//               <p className="text-2xl font-bold text-yellow-500 flex items-center justify-center gap-1">
//                 4.8/5 <FaStar className="text-yellow-400" />
//               </p>
//               <p className="text-gray-600 text-sm">App Rating</p>
//             </div>
//           </div>
//         </div>

//         {/* Testimonials */}
//         <div className="mt-16 grid gap-6 md:grid-cols-2">
//           {testimonials.map((t, idx) => (
//             <div
//               key={idx}
//               className="relative bg-blue-50 border border-blue-100 rounded-2xl shadow-md p-6 text-left"
//             >
//               {/* Decorative random shapes alternating */}
//               {idx % 2 === 0 ? (
//                 <div className="absolute -top-4 -left-4 w-12 h-12 bg-blue-200 rounded-full opacity-30"></div>
//               ) : (
//                 <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-blue-300 rotate-45 opacity-20"></div>
//               )}

//               <div className="flex items-center gap-3 mb-3">
//                 <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
//                 <div>
//                   <p className="font-semibold text-gray-800">{t.name}</p>
//                   <p className="text-sm text-gray-500">{t.title}</p>
//                 </div>
//               </div>
//               <p className="text-gray-700 italic">“{t.feedback}”</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Testimonials;



// import React from 'react';
// import person_img from "../../assets/Overlay+Shadow.png"
// const TestimonialCard = ({ name, title, testimonial, image, reached, expanded }) => (
//   <div className="bg-blue-50 rounded-lg p-6 shadow-md max-w-md mx-auto mb-6">
//     <div className="flex items-center mb-4">
//       <img src={image} alt={name} className="w-12 h-12 rounded-full mr-4" />
//       <div>
//         <h3 className="font-semibold text-lg">{name}</h3>
//         <p className="text-gray-600 text-sm">{title}</p>
//       </div>
//     </div>
//     <p className="text-gray-700 italic">&quot;{testimonial}&quot;</p>
//     <div className="flex justify-between mt-4 text-blue-600 text-sm">
//       {reached && <span>Reached {reached}</span>}
//       {expanded && <span>Expanded reach to {expanded}</span>}
//     </div>
//   </div>
// );

// const Testimonials = () => {
//   const testimonials = [
//     {
//       name: "sree",
//       title: "Sree Fashions Owner, Bengal",
//       testimonial: "Managing my textile business became so much easier with DVYB. Online orders and customer management boosted my monthly revenue significantly.",
//       image: person_img,
//       reached: "500+ new customers"
//     },
//     {
//       name: "Rajesh Kumar",
//       title: "Devyani Fashions Owner, Mumbai",
//       testimonial: "DVYB transformed my small store into a digital powerhouse. My customers can now order online, and I've expanded my reach beyond my neighborhood.",
//       image: person_img,
//       expanded: "5+ cities"
//     },
//     {
//       name: "Anita Sharma",
//       title: "Kiran Textiles Owner, Delhi",
//       testimonial: "With DVYB, my online sales have doubled, and managing inventory has never been easier.",
//       image: person_img,
//       reached: "300+ new customers"
//     },
//     {
//       name: "Vikram Patel",
//       title: "Sutra Fabrics Owner, Ahmedabad",
//       testimonial: "DVYB's customer support and tools helped me grow my business exponentially.",
//       image: person_img,
//       expanded: "4+ cities"
//     },
//     {
//       name: "Priya Menon",
//       title: "Lakshmi Silks Owner, Chennai",
//       testimonial: "Online orders through DVYB have transformed my small shop into a thriving business.",
//       image: person_img,
//       reached: "400+ new customers"
//     },
//     {
//       name: "Sunil Reddy",
//       title: "Sai Textiles Owner, Hyderabad",
//       testimonial: "DVYB's platform made it simple to reach new markets and increase my profits.",
//       image: person_img,
//       expanded: "6+ cities"
//     },
//   ];

//   return (
//     <div className="container mx-auto p-6">
//       {testimonials.map((testimonial, index) => (
//         <TestimonialCard key={index} {...testimonial} />
//       ))}
//     </div>
//   );
// };

// export default Testimonials;


// import React from 'react';
// import person_img from "../../assets/Overlay+Shadow.png"

// const TestimonialCard = ({ name, title, testimonial, image, reached, expanded, className }) => (
//   <div className={`bg-blue-50 rounded-lg p-6 shadow-md max-w-md mx-auto mb-17 transition-transform duration-300 ${className}`}>
//     <div className="flex items-center mb-4">
//       <img src={image} alt={name} className="w-12 h-12 rounded-full mr-4" />
//       <div>
//         <h3 className="font-semibold text-lg">{name}</h3>
//         <p className="text-gray-600 text-sm">{title}</p>
//       </div>
//     </div>
//     <p className="text-gray-700 italic">&quot;{testimonial}&quot;</p>
//     <div className="flex justify-between mt-4 text-blue-600 text-sm">
//       {reached && <span>Reached {reached}</span>}
//       {expanded && <span>Expanded reach to {expanded}</span>}
//     </div>
//   </div>
// );

// const Testimonials = () => {
//   const testimonials = [
//     {
//       name: "sree",
//       title: "Sree Fashions Owner, Bengal",
//       testimonial: "Managing my textile business became so much easier with DVYB. Online orders and customer management boosted my monthly revenue significantly.",
//       image: person_img,
//       reached: "500+ new customers"
//     },
//     {
//       name: "Rajesh Kumar",
//       title: "Devyani Fashions Owner, Mumbai",
//       testimonial: "DVYB transformed my small store into a digital powerhouse. My customers can now order online, and I've expanded my reach beyond my neighborhood.",
//       image: person_img,
//       expanded: "5+ cities"
//     },
//     {
//       name: "Anita Sharma",
//       title: "Kiran Textiles Owner, Delhi",
//       testimonial: "With DVYB, my online sales have doubled, and managing inventory has never been easier.",
//       image: person_img,
//       reached: "300+ new customers"
//     },
//     {
//       name: "Vikram Patel",
//       title: "Sutra Fabrics Owner, Ahmedabad",
//       testimonial: "DVYB's customer support and tools helped me grow my business exponentially.",
//       image: person_img,
//       expanded: "4+ cities"
//     },
//     {
//       name: "Priya Menon",
//       title: "Lakshmi Silks Owner, Chennai",
//       testimonial: "Online orders through DVYB have transformed my small shop into a thriving business.",
//       image: person_img,
//       reached: "400+ new customers"
//     },
//     {
//       name: "Sunil Reddy",
//       title: "Sai Textiles Owner, Hyderabad",
//       testimonial: "DVYB's platform made it simple to reach new markets and increase my profits.",
//       image: person_img,
//       expanded: "6+ cities"
//     },
//   ];

//   // Alternating rotation based on the card index
//   const getRotateClass = idx =>
//     idx % 2 === 0
//       ? "rotate-[4deg]"
//       : "rotate-[-4deg]";

//   return (
//     <div className="container mx-auto p-6">
//          <div className="text-center mb-8">
//         <h2 className="text-2xl md:text-3xl font-bold text-[#1F335C]">
//           Why Vendors Love <span className="text-blue-700">DVYB</span>
//         </h2>
//         <p className="text-gray-600 text-sm md:text-base mt-1">
//           Join thousands of successful vendors who've transformed their business
//         </p>

//         {/* Stats Boxes */}
//         <div className="mt-6 mb-4 inline-flex rounded-full overflow-hidden border border-gray-200 shadow-sm">
//           <div className="bg-blue-100 px-6 py-3 text-center">
//             <p className="text-2xl font-semibold text-blue-700">3,157+</p>
//             <p className="text-xs text-gray-600">Active Vendors</p>
//           </div>
//           <div className="border-l border-r border-gray-200 bg-green-100 px-6 py-3 text-center">
//             <p className="text-2xl font-semibold text-green-700">₹47Cr+</p>
//             <p className="text-xs text-gray-600">Monthly Sales</p>
//           </div>
//           <div className="bg-yellow-100 px-6 py-3 text-center">
//             <p className="text-2xl font-semibold text-yellow-600">4.8/5</p>
//             <p className="text-xs text-gray-600">App Rating</p>
//           </div>
//         </div>
//       </div>
//       {testimonials.map((testimonial, index) => (
//         <TestimonialCard
//           key={index}
//           {...testimonial}
//           className={getRotateClass(index)}
//         />
//       ))}
//     </div>
//   );
// };

// export default Testimonials;


import React from 'react';
import { motion } from 'framer-motion';
import person_img from "../../assets/Overlay+Shadow.png";

const TestimonialCard = ({ name, title, testimonial, image, reached, expanded, className }) => (
  <div className={`bg-blue-50 rounded-lg p-6 shadow-md max-w-md mx-auto mb-17 transition-transform duration-300 ${className}`}>
    <div className="flex items-center mb-4">
      <img src={image} alt={name} className="w-12 h-12 rounded-full mr-4" />
      <div>
        <h3 className="font-semibold text-lg">{name}</h3>
        <p className="text-gray-600 text-sm">{title}</p>
      </div>
    </div>
    <p className="text-gray-700 italic">&quot;{testimonial}&quot;</p>
    <div className="flex justify-between mt-4 text-blue-600 text-sm">
      {reached && <span>Reached {reached}</span>}
      {expanded && <span>Expanded reach to {expanded}</span>}
    </div>
  </div>
);

const Testimonials = () => {
  const testimonials = [
    {
      name: "sree",
      title: "Sree Fashions Owner, Bengal",
      testimonial: "Managing my textile business became so much easier with DVYB. Online orders and customer management boosted my monthly revenue significantly.",
      image: person_img,
      reached: "500+ new customers"
    },
    {
      name: "Rajesh Kumar",
      title: "Devyani Fashions Owner, Mumbai",
      testimonial: "DVYB transformed my small store into a digital powerhouse. My customers can now order online, and I've expanded my reach beyond my neighborhood.",
      image: person_img,
      expanded: "5+ cities"
    },
    {
      name: "Anita Sharma",
      title: "Kiran Textiles Owner, Delhi",
      testimonial: "With DVYB, my online sales have doubled, and managing inventory has never been easier.",
      image: person_img,
      reached: "300+ new customers"
    },
    {
      name: "Vikram Patel",
      title: "Sutra Fabrics Owner, Ahmedabad",
      testimonial: "DVYB's customer support and tools helped me grow my business exponentially.",
      image: person_img,
      expanded: "4+ cities"
    },
    {
      name: "Priya Menon",
      title: "Lakshmi Silks Owner, Chennai",
      testimonial: "Online orders through DVYB have transformed my small shop into a thriving business.",
      image: person_img,
      reached: "400+ new customers"
    },
    {
      name: "Sunil Reddy",
      title: "Sai Textiles Owner, Hyderabad",
      testimonial: "DVYB's platform made it simple to reach new markets and increase my profits.",
      image: person_img,
      expanded: "6+ cities"
    },
  ];

  const getRotateClass = (idx) =>
    idx % 2 === 0 ? "rotate-[4deg]" : "rotate-[-4deg]";

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.15, duration: 0.6, ease: "easeOut" },
    }),
  };

  return (
    <div className="container mx-auto p-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-[#1F335C]">
          Why Vendors Love <span className="text-blue-700">DVYB</span>
        </h2>
        <p className="text-gray-600 text-sm md:text-base mt-1">
          Join thousands of successful vendors who've transformed their business
        </p>

        {/* Stats Boxes */}
        <div className="mt-6 mb-4 inline-flex rounded-full overflow-hidden border border-gray-200 shadow-sm">
          <div className="bg-blue-100 px-6 py-3 text-center">
            <p className="text-2xl font-semibold text-blue-700">3,157+</p>
            <p className="text-xs text-gray-600">Active Vendors</p>
          </div>
          <div className="border-l border-r border-gray-200 bg-green-100 px-6 py-3 text-center">
            <p className="text-2xl font-semibold text-green-700">₹47Cr+</p>
            <p className="text-xs text-gray-600">Monthly Sales</p>
          </div>
          <div className="bg-yellow-100 px-6 py-3 text-center">
            <p className="text-2xl font-semibold text-yellow-600">4.8/5</p>
            <p className="text-xs text-gray-600">App Rating</p>
          </div>
        </div>
      </div>

      {testimonials.map((testimonial, index) => (
        <motion.div
          key={index}
          custom={index}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={cardVariants}
          className={getRotateClass(index)}
        >
          <TestimonialCard {...testimonial} />
        </motion.div>
      ))}
    </div>
  );
};

export default Testimonials;
