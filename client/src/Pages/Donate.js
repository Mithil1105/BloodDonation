import React from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { Link } from "react-router-dom";
import ArrowCircleLeftRoundedIcon from "@mui/icons-material/ArrowCircleLeftRounded";
import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/20/solid";

const Donate = () => {
  const routeParams = useParams();
  const [request_id, setRequestId] = useState(routeParams.id || "0");
  const [status, setStatus] = useState("");

  return (
    <div className="h-full pt-3 pl-5">
      <Link to="/feed" className="text-xl ml-5 lg:ml-20 mb-5">
        <ArrowCircleLeftRoundedIcon className="mr-2" />
        Feed
      </Link>

      <h1 className="font-bold text-red-500 text-4xl p-4 lg:text-6xl text-center font-cust1">
        Ready to Donate?
      </h1>
      <p>Donation Request Details:</p>
      <p className="font-bold text-2xl">Request id:{request_id}</p>
      <p className="font-bold">Status:</p>

      <div className="flex flex-col space-y-3 mt-10 items-center h-screen">
        <Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button className="flex w-3/4 justify-between rounded-lg bg-red-200 px-4 py-4 text-left text-lg font-medium hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500/75">
                <span>Before Your Donation</span>
                <ChevronUpIcon
                  className={`${
                    open ? "rotate-180 transform" : ""
                  } h-5 w-5 text-purple-500`}
                />
              </Disclosure.Button>
              <Disclosure.Panel className="px-4 pb-2 pt-4 text-md text-gray-500">
                <ul>
                <li>Stay hydrated: Drink plenty of water. Before you donate, drink
                at least 16 ounces of water for the best blood donation
                experience. Drinking water helps reduce the risk of low blood
                pressure during blood donation, which is the most common cause
                of fainting. It also makes your veins easier to access and can
                speed up your donation. Avoid alcohol and caffeine, which can
                dehydrate you.</li>
                <li>Eat healthy: Avoid foods high in fat, like fries
                or ice cream. Donating blood can make your iron level drop—you
                can prepare your body by eating foods rich in iron and vitamin C
                before you donate. Some examples of these kinds of foods
                include: Beans and lentils Nuts and seeds Leafy greens like
                spinach or broccoli Citrus fruits Berries</li>
                Get your ID cards ready: Bring a form of identification, such as a driver’s
                license or passport, to your donation appointment. The type of
                identification needed may vary by donation center.
                </ul>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>

        <Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button className="flex w-3/4 justify-between rounded-lg bg-red-200 px-4 py-4 text-left text-lg font-medium hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500/75 mt-8">
                <span>During Your Donation</span>
                <ChevronUpIcon
                  className={`${
                    open ? "rotate-180 transform" : ""
                  } h-5 w-5 text-purple-500`}
                />
              </Disclosure.Button>
              <Disclosure.Panel className="px-4 pb-2 pt-4 text-md text-gray-500">
              <ul>
                <li>Health history and health check: 
                  You will fill out a questionnaire about your health, travel, 
                  and lifestyle to confirm your eligibility. 
                  Someone will also check your temperature, 
                  blood pressure, red blood cell or hemoglobin levels, and pulse.</li>
                <li>Refreshment and recovery: You will enjoy a light snack and drink 
                  while waiting 10–15 minutes before you should leave and resume your daily activities.</li>
                </ul>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </div>
    </div>
  );
};

export default Donate;
