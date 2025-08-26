import React from "react";
import Footer from "../Components/Footer";

const TermsAndConditions = () => {
  return (
    <div className="max-w-1xl mx-auto p-6 bg-white rounded-lg shadow-md w-full">
      <h1 className="text-3xl font-bold text-center mb-6 text-blue-800">
        Terms And Conditions
      </h1>

      <p className="text-lg text-gray-700 mb-6 leading-relaxed">
        Welcome to DVYB Vendor App. By using our app and services, you agree to
        these Terms and Conditions ("Terms"). Please read them carefully.
      </p>

      <div className="mb-5 text-start">
        <h2 className="text-xl font-semibold text-blue-800 mb-2">
          Eligibility:
        </h2>
        <p className="text-gray-700 ml-4 text-start">
          You must be at least 18 years old and a registered business owner or
          authorized representative.
        </p>
      </div>

      <div className="mb-5 text-start">
        <h2 className="text-xl font-semibold text-blue-800 mb-2 text-start">
          Account Registration:
        </h2>
        <p className="text-gray-700 ml-4 text-start">
          Provide accurate information and keep your login details confidential.
          Notify us of any unauthorized use immediately.
        </p>
      </div>

      <div className="mb-5 text-start">
        <h2 className="text-xl font-semibold text-blue-800 mb-2 text-start">
          Use of Services:
        </h2>
        <p className="text-gray-700 ml-4 text-start">
          DVYB offers digital inventory and analytics tools for Digi Warehouse
          businesses. Use the app lawfully and responsibly.
        </p>
      </div>

      <div className="mb-5 text-start">
        <h2 className="text-xl font-semibold text-blue-800 mb-2">
          Fees and Payments:
        </h2>
        <p className="text-gray-700 ml-4 text-start">
          Onboarding is free; premium services may incur fees communicated
          upfront. Timely payment is required.
        </p>
      </div>

      <div className="mb-5 text-start">
        <h2 className="text-xl font-semibold text-blue-800 mb-2">
          Intellectual Property:
        </h2>
        <p className="text-gray-700 ml-4 text-start">
          All content and software are owned by DVYB or licensors. Do not
          reproduce without permission
        </p>
      </div>

      <div className="mb-5 text-start">
        <h2 className="text-xl font-semibold text-blue-800 mb-2">
          Data Privacy and Security:
        </h2>
        <p className="text-gray-700 ml-4 text-start">
          Your data is handled per our Privacy Policy. We use industry-standard
          security but cannot guarantee absolute security. Don’t share login
          info
        </p>
      </div>

      <div className="mb-5 text-start">
        <h2 className="text-xl font-semibold text-blue-800 mb-2">
          Disclaimer:
        </h2>
        <p className="text-gray-700 ml-4 text-start">
          App provided “as is” without guarantees. We aren’t liable for
          interruptions or third-party issues
        </p>
      </div>

      <div className="mb-5 text-start">
        <h2 className="text-xl font-semibold text-blue-800 mb-2">
          Limitation of Liability
        </h2>
        <p className="text-gray-700 ml-4 text-start">
          DVYB is not liable for indirect damages. Our total liability is
          limited to fees you paid, if any.
        </p>
      </div>

      

      <div className="mb-5 text-start">
        <h2 className="text-xl font-semibold text-blue-800 mb-2">
          Termination:
        </h2>
        <p className="text-gray-700 ml-4 text-start">
          We may suspend or terminate accounts violating Terms. You can delete
          your account anytime.
        </p>
      </div>

      <div className="mb-5 text-start">
        <h2 className="text-xl font-semibold text-blue-800 mb-2">
          Changes to Terms:
        </h2>
        <p className="text-gray-700 ml-4 text-start">
          We may update these Terms and notify users. Continued use means
          acceptance.
        </p>
      </div>

      <div className="mb-5 text-start">
        <h2 className="text-xl font-semibold text-blue-800 mb-2">
          Governing Law:
        </h2>
        <p className="text-gray-700 ml-4 text-start">
          These Terms follow Indian laws
        </p>
      </div>

      <div className="mb-5 text-start">
        <h2 className="text-xl font-semibold text-blue-800 mb-2">
          Contact Us:
        </h2>
        <p className="text-gray-700 ml-4 text-start">
          Email: support@dvybapp.com<br></br>
          WhatsApp: +91-XXXXXXXXXX
        </p>
      </div>
      <Footer />
    </div>
  );
};

export default TermsAndConditions;
