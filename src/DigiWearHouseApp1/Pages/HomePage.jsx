import React from "react";
import SetUp from "../Components/SetUp.jsx";
import Testimonials from "../Components/Testimonials.jsx";
import Footer from "../Components/Footer.jsx";
import FAQSection from "../Components/FAQSection.jsx";
import FeatureSection from "../Components/features.jsx";

function HomePage (){

    return<>
    <SetUp/>
    <FeatureSection/>
    <Testimonials/>
    {/* <FAQSection id="faq" /> */}
    
  <FAQSection />


    <Footer/>
    </>
}

export default HomePage;