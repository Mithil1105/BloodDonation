import React from "react";

const About = () => {
  return (
    <>
      <div className="h-full p-8">
        <div className="lg:grid ;g:grid-cols-2">
          <h1 className="font-bold text-3xl pt-10 lg:text-6xl">
            Hi we are <br></br>DonateNow
          </h1>
          <p className="pt-5 text-lg font-poppins">
            Our aim is to provide hospitals a tool to request blood donations
            quicky and efficiently.<br></br>
            The application allows for efficient matching of available blood
            types with the need of patients and hospitals.
            <br></br>It offers a convenient way for donors to schedule
            appointments and find donation centers near them.
          </p>
          {/* </div>
         <div className="font-bold text-2xl text-[#3C3C3C] text-center mt-20 mb-16 lg:mb-10">
          Our Team
        </div>  
        <div className="flex flex-col space-y-10 p-8 lg:flex-row lg:space-x-28 mb-10">
            <div className="flex flex-col justify-center items-center">
                  <img src={jay_img} className="rounded-full w-[300px] h-[250px] lg:w-[300px] lg:h-[200px] block"></img>
                  <div className='font-bold text-xl'>Jay Patel</div>
            </div>
            <div className="flex flex-col justify-center items-center">
                  <img src={athul_img} className="rounded-full w-[300px] h-[250px] lg:w-[300px] lg:h-[200px] block"></img>
                  <div className='font-bold text-xl'>Athul Srinivas</div>
            </div>
            <div className="flex flex-col justify-center items-center">
                  <img src={sid_img} className="rounded-full w-[300px] h-[250px] lg:w-[300px] lg:h-[200px] block"></img>
                  <div className='font-bold text-xl'>Sidhant Sharma</div>
            </div>
            <div className="flex flex-col justify-center items-center">
                  <img src={naamya_img} className="rounded-full w-[300px] h-[250px] lg:w-[300px] lg:h-[200px] block"></img>
                  <div className='font-bold text-xl'>Naamya Patiyal</div>
            </div> */}
        </div>
      </div>
    </>
  );
};

export default About;
