import React from "react";
import { useState, useEffect } from "react";
import { useAuth } from "../Hooks/useAuth";
import { Link } from "react-router-dom";
import CountUp from "react-countup";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';

import axios from "../axios";

const Dashboard = () => {
  const auth = useAuth();

  const [medData, setMedData] = useState("");
  const [donations, setDonations] = useState([]);
  const userID = auth?.auth?.donor_id;

  useEffect(() => {
    axios
      .get(`/user/getDetailsOfUser/${userID}`, {
        headers: {
          Authorization: `Bearer ${auth?.auth?.token}`,
        },
      })
      .then((response) => {
        setMedData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching donor data:", error);
      });
  }, []);

  const user = medData;
  const bldAmount = medData?.medInfo?.totalAmountDonated || 0;
  const lastDonated = medData?.medInfo?.lastDonationDate ;
  let last_don = lastDonated?.slice(0,10)
  last_don = last_don?.split("-").reverse().join("-");

  useEffect(() => {
      axios
        .get(`/user/getAllDonationsofUser/${userID}`, {
          headers: {
            Authorization: `Bearer ${auth?.auth?.token}`,
          },
        })
        .then((response) => {
          setDonations(response.data);
        })
        .catch((error) => {
          console.error("Error fetching donation data:", error);
        });
  }, []);

  return (
    <div className="pt-10 lg:pt-16">
    <div className="bg-[#E1E1E1] rounded-md pt-2 font-cust1">

        <div className="flex flex-col p-5 bg-white rounded-md">
            <h1 className="text-5xl"><span>Welcome</span> <span className="font-bold">{user?.firstName}</span> </h1>
            <div className="mt-5 text-red-600 flex flex-row space-x-4">
            <div className="text-5xl">{user?.medInfo?.bldgrp}</div>
            {lastDonated && <div className="ml-20 text-xl lg:text-xl">Last Donated : {last_don}</div>}
            </div>
        </div>
          <div className="w-full px-2 py-2 lg:px-5 lg:mt-10">
            <div className="flex flex-col space-y-2 lg:grid lg:grid-cols-2 lg:gap-3 mt-5">
              <div className="rounded-md bg-white pl-10 grid grid-cols-2">
              <div className="pt-8">
                  <div className="flex">
                    <div className="text-red-500 text-4xl lg:text-8xl">
                      <CountUp end={bldAmount} duration={10} />
                    </div>
                    <div className="text-red-500 text-3xl">ml</div>
                  </div>
                  <h1 className="text-2xl text-red-500 font-bold">
                    of Blood Donated
                  </h1>
              </div>
              <div className="mt-3 mb-3 w-3/4 h-3/4">
                <CircularProgressbar value={bldAmount/100} maxValue={1}
                 styles={buildStyles({
                  rotation: 0.25,
                  strokeLinecap: 'butt',
                  pathTransitionDuration: 0.5,
                  pathColor: `rgb(239 68 68)`,
                  trailColor: '#d6d6d6',
                  backgroundColor: '#3e98c7',})} />
              </div>
              </div>
              <div className='rounded-md bg-white p-4'>
                <TableHeader/>
                {donations.length==1 && <TableRow props={donations[0]}></TableRow>}
                {donations.length > 1 && donations.map(donation => {
                     return(<TableRow props={donation}></TableRow>)
                })}
                {donations.length==0 && <div className="text-center font-semibold text-xl">No donations yet</div>}
                {donations.length>3 ? <Link  className='bg-gray-200 p-2 rounded-md text-lg'to='/donhistory'>See more</Link>:<p> </p>}
              </div>
            </div>
            <div className="bg-white rounded-md p-10 mt-5 text-lg">
              <div className="flex flex-row space-x-6">
              <label className="w-32 font-bold">Full Name</label> <p>{user?.firstName} {user?.lastName}</p>
              </div>
              <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>
              <div className="flex flex-row space-x-6">
              <label className="w-32 font-bold">Email</label> <p>{user?.email}</p>
              </div>
              <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>
              <div className="flex flex-row space-x-6">
              <label className="w-32 font-bold">Phone No.</label> <p>{user?.phonenum}</p>
              </div>
              <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>
              <div className="flex flex-row space-x-6">
              <label className="w-32 font-bold">Gender:</label> <p>{user?.medInfo?.sex}</p>
              </div>
              <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>
              <div className="flex flex-row space-x-6">
              <label className="w-32 font-bold">Age:</label> <p>{user?.medInfo?.age}</p>
              </div>
              <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>
            </div>
            </div>
          </div>
          </div>
  );
};

export default Dashboard;

 const TableHeader = () => {
   return (
     <div>
       <div className="grid grid-cols-3 font-bold text-lg pt-2 pb-3">
         <div>Date</div>
         <div>Amount Donated</div>
         <div>Donation Id</div>
       </div>
     </div>
   );
 };

 const TableRow = (props) => {
  const lastDonated = props.props.dateOfDonation ;
  let last_don = lastDonated?.slice(0,10)
  last_don = last_don?.split("-").reverse().join("-");
   return (
        <div className="grid grid-cols-3 gap-2 text-md pl-3 pt-5 pb-5">
        <div>{last_don}</div>
         <div>{props.props.amount_Donated}</div>
         <div>{props.props.donation_id}</div>
        </div>   )
 };
