import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import React from "react";


import axios from "../axios";

import { useState } from "react";

import toast from "react-hot-toast";

const MedInfo = () => {
  const [bldgrp, setBldGrp] = useState("");
  const [age, setAge] = useState("");
  const [selectedGender, setSelectedGender] = useState("");
  const [message, setMessage] = useState("");

  const loggedInUser = JSON.parse(localStorage.getItem("user"));

  const medinfo = async () => {
    try {
      const response = await axios.post(
        "/user/addMedInfo",
        {
          donor_id: loggedInUser.donor_id,
          bldgrp: bldgrp,
          age: age,
          sex: selectedGender,
        }
      );

      toast.success('MedInfo Added!')


      // Remove user from local storage
      localStorage.removeItem("user");

      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 1000);
    } catch (error) {
      toast.error('Registration Unsuccessful!')
      console.error("Error adding MedInfo:", error);
      setMessage(error.response.data.message);
    }
  };

  const handleGenderChange = (event) => {
    setSelectedGender(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto font-cust1">
        <div className="w-full rounded-lg shadow">
          <div className="p-6 space-y-4">
            <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">
              Medical Info
            </h1>
            <p style={{ color: "red" }}>{message}</p>
            <form onSubmit={handleSubmit} className="space-y-4 ">
              <div className='flex flex-row space-x-5'>
                <h3 className="font-bold">Sex:</h3>
                <label>
                  <input
                    type="radio"
                    value="Male"
                    checked={selectedGender === "Male"}
                    onChange={handleGenderChange}
                  />
                  Male
                </label>
                <label>
                  <input
                    type="radio"
                    value="Female"
                    checked={selectedGender === "Female"}
                    onChange={handleGenderChange}
                  />
                  Female
                </label>
                <label>
                  <input
                    type="radio"
                    value="Other"
                    checked={selectedGender === "Other"}
                    onChange={handleGenderChange}
                  />
                  Other
                </label>
              </div>
              <p>Selected Gender: {selectedGender}</p>
              <div>
                <label
                  htmlFor="blood-group"
                  className="block mb-3 items-start font-bold mt-2"
                >
                  Blood Group:
                </label>
                <FormControl fullWidth>
                  <Select
                    id="blood-group"
                    value={bldgrp}
                    label="blood-group"
                    onChange={(e) => setBldGrp(e.target.value)}
                  >
                    <MenuItem value={"A+"}>A+</MenuItem>
                    <MenuItem value={"A-"}>A-</MenuItem>
                    <MenuItem value={"B+"}>B+</MenuItem>
                    <MenuItem value={"B-"}>B-</MenuItem>
                    <MenuItem value={"O+"}>O+</MenuItem>
                    <MenuItem value={"O-"}>O-</MenuItem>
                    <MenuItem value={"AB+"}>AB+</MenuItem>
                    <MenuItem value={"AB-"}>AB-</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div>
                <label
                  htmlFor="age"
                  className="block mb-3 items-start font-bold mt-2"
                >
                  Age:
                </label>
                <input
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-1/4 p-2.5 "
                  required
                  id="age"
                  name="age"
                  placeholder="18-60"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className="w-80 text-white bg-emerald-400 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-2.5 py-2.5 text-center"
                onClick={medinfo}
              >
                Register
              </button>
            </form>
          </div>
        </div>
      </div>
  );
};

export default MedInfo;
