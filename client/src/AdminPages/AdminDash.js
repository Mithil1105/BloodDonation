import React from "react";
import { useState, useEffect } from "react";
import { PieChart, pieArcLabelClasses } from "@mui/x-charts/PieChart";
import axios from "../axios";
import dateFormat from "dateformat";
import CurrentRequests from "../Components/CurrentRequests";

import toast from "react-hot-toast";

const ADMIN_INFO_URL = "/admin/admininfo";

const AdminDash = () => {
  const [exp_arr, set_exp_arr] = useState([]);
  const [piedata, setpiedata] = useState([]);
  const palette = ["red", "green", "blue", "yellow", "orange", "purple"];

  useEffect(() => {
    axios
      .get(ADMIN_INFO_URL)
      .then((response) => {
        // console.log("response received");
        // console.log(response.data);
        setpiedata(response.data.piedata);
        set_exp_arr(response.data.result);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // Assuming you have a state variable for user list
  const [userList, setUserList] = useState(exp_arr);

  // Function to sort by username
  const sortByUsername = () => {
    const sortedList = [...userList].sort((a, b) =>
      a.username.localeCompare(b.username)
    );
    setUserList(sortedList);
  };

  // Function to search by blood group
  const searchByBloodGroup = (bloodGroup) => {
    const filteredList = [...userList].filter(
      (user) => user.bloodGroup === bloodGroup
    );
    setUserList(filteredList);
  };


  return (
    <>
      <div className="p-5 font-cust1">
        <h1 className="font-bold text-4xl">Admin page</h1>
        <div>
          <PieChart
            series={[
              {
                arcLabel: (item) => `${item.label} (${item.value})`,
                arcLabelMinAngle: 45,
                outerRadius: 150,
                data: piedata,
                highlightScope: { faded: "global", highlighted: "item" },
                faded: { innerRadius: 5, additionalRadius: -5 },
              },
            ]}
            sx={{
              [`& .${pieArcLabelClasses.root}`]: {
                fill: "white",
                fontWeight: "bold",
              },
            }}
            height={300}
            legend={{ hidden: true }}
          />
          <h1 className="font-bold text-2xl mt-10">Users:</h1>
          <div className="ml-2 pt-10 pb-20 overflow-scroll">
            {exp_arr.map((id) => (
              <AdminCard
                state={id}
                donor_id={id?.donor_id}
                firstName={id?.firstName}
                email={id?.email}
                createdAt={id?.createdAt}
                bloodgrp={id.usersdetails[0]?.bldgrp}
                phonenum={id?.phonenum}
              />
            ))}
          </div>
        </div>
        <h1 className="font-bold text-2xl mt-10">Current Requests:</h1>
        <CurrentRequests/>
      </div>
    </>
  );
};

export default AdminDash;

const AdminCard = (props) => {
  const deleteUser = (userId) => {
    axios.delete(`/user/delUser/${userId}`)
        .then((response) => {
        console.log(response);
        toast.success('User Deleted!')
        //const newList = requests.filter((item) => item.request_id !== reqId);
        //setRequests(newList);
      })
      .catch((error) => 
      {
        toast.error('Error in deletion!')
        console.log(error)
      })
  }

  // {console.log(props)}
  return (
    <div className="bg-gray-200 mt-1">
      <div className="grid grid-cols-7 gap-3 font-bold text-md px-1 py-2">
        <div>{props?.donor_id}</div>
        <div>{props?.firstName}</div>
        <div className="break-words">{props?.email}</div>
        <div>{dateFormat(props?.createdAt, "mmmm dS, yyyy")}</div>
        <div>{props?.bloodgrp}</div>
        <div>{props?.phonenum}</div>
        <button className='focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2' onClick={() => deleteUser(props.donor_id)}>Delete</button>
      </div>
    </div>
  );
};

