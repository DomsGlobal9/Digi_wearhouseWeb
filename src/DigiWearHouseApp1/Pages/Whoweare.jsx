import React from "react";
import heroimg from "../../assets/whoweImg1.png"
import sideimg1 from "../../assets/sideimg1.png"
import sideimg2 from "../../assets/sideimg2.png"
import sideimg3 from "../../assets/sideimg3.png"
import Roundcorner from "../../assets/roundcorner.png"
import Tailor1 from "../../assets/tailor1.png"
import Tailor2 from "../../assets/tailor2.png"
import Tailor3 from "../../assets/tailor3.png"
import Tailor4 from "../../assets/tailor4.png"
import Service1 from "../../assets/service1.png"
import Service2 from "../../assets/service2.png"
import Service3 from "../../assets/service3.png"

function Whoweare (){


    return<>
    
    <div className="flex gap-8 items-center">
        <div><img src={heroimg} className="h-1/2" alt="" /></div>
        <div className="items-center">

<h1 className="text-4xl text-blue-400">Who We Are</h1>

            <p className="mt-4">DVYB Vendor App is built for small and medium-sized <br /> store owners, suppliers, and partners across Digi <br /> Warehouse networks.</p>
       <p className="text-wrap mt-4 ">We believe in authentic success stories, effortless <br /> onboarding, and complete data privacy. By partnering <br /> with Digi Warehouse and integrating Indian payment <br />systems (UPI, GST), DVYB helps thousands of vendors <br />transform their businesses from paper to digital—boosting <br /> revenue, saving time, and growing confidently.</p>
        </div>
    </div>


<div className="flex gap-12 ml-24  items-end">
    <div><img src={sideimg1} className="" alt="" /></div>
        <div><img src={sideimg2} className="h-96 pl-16 flex " alt="" /></div>
            <div><img src={sideimg3} className="h-80 transform translate-20" alt="" /></div>
</div>


<div className="flex mt-36 items-center  ">
    <div className="gap-16 " >

        <div  className="gap-16 " >
            <h1 className="text-4xl text-blue-500 ">Why Us</h1>
            <p className="mt-6">Trusted by over 3,200+ local businesses nationwide</p>
            <p>Designed specifically for the Indian market—supporting multiple languages</p>
            <p>Dedicated team support </p>
            <p>Your data stays 100% secure and private, always
    Join us and discover how DVYB makes easy</p>
        </div>
        <div>
            <h1 className="text-3xl  text-blue-500 mt-6">Mission</h1>
            <p className="mt-6"> <span className="to-blue-400 ">Our mission is simple: </span> <span>help every business owner turn chaos into growth with easy, digital inventory management, fast onboarding, and real-time business analytics—no technical expertise required.</span></p>
        </div>
    </div>

    <div><img src={Roundcorner} alt="" /></div>
</div>

<div className="flex ml-18 gap-6 transform -translate-y-20">
    <img src={Tailor1} alt="" />
    <img src={Tailor2} alt="" />
    <img src={Tailor3} alt="" />
    <img src={Tailor4} alt="" />
</div>

<div className="items-center">
    <h1 className="text-4xl">Our Services</h1>
    <div className="flex gap-6 mt-12 ml-44 ">
        <img src={Service1} alt="" />
        <img src={Service2} alt="" />
        <img src={Service3} alt="" />
    </div>
</div>
    </>




}

export default Whoweare;