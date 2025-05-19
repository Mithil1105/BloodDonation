import React from "react";
import { useState } from "react";
import axios from "../axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { InputLabel } from "@mui/material";
import { create } from "@mui/material/styles/createTransitions";
import toast from "react-hot-toast";


const MSG_URL = "/admin/sendMsg";

const SendMessage = () => {
  const [bldgrp, setBldGrp] = useState("");
  const [smsText, setSmsText] = useState("");
  const [enddate, setEndate] = useState("");
  const [donationType, setDonationType] = useState("");
  const [emergencyLevel, setEmergencyLevel] = useState("");
  const [amountOfBlood, setAmountOfBlood] = useState("");
  const [location, setLocation] = useState("");
  const [locUrl, setlocUrl] = useState("");
  const [reqId, setReqId] = useState("");
  const [message, setMessage] = useState("");

  const sendMessage = () => {
    //console.log("Inside send message");
    axios
      .post(MSG_URL, {
        smsText: smsText,
        bldgrp: bldgrp,
      })
      .then((response) => {
        toast.success('Message Sent!')
        //console.log("Message sent");
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const createRequest = () => {
    //console.log("Inside create request");
    axios
      .post("/admin/addRequests", {
        bldGrpRequired: bldgrp,
        amount_Required: amountOfBlood,
        amount_Remaining: amountOfBlood,
        endDate_of_Request: enddate,
        location: location,
        locUrl : locUrl,
        donationType: donationType,
        emergencyLevel: emergencyLevel,
      })
      .then((response) => {
        //console.log("Request created");
        toast.success('Request Created!')
        setMessage("Request Created Successfully");
        console.log(response?.data?.result?.requet_id);
        setReqId(response?.data?.result?.request_id);
      })
      .catch((error) => {
        setMessage("Error");
        console.log(error);
      });
  };

  const [bloodArray, setBloodArray] = useState([]);
  const handleChange = (e) => {
    const value = e.target.value;
    const checked = e.target.checked;
    // console.log(value, checked);
    console.log(bloodArray);
    if (checked) {
      setBloodArray([...bloodArray, value]);
    } else {
      setBloodArray(bloodArray.filter((e) => e !== value));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="p-10 h-full">
      <h1 className="text-2xl font-bold">Create Request</h1>

      <form onSubmit={handleSubmit} className="space-y-4 ">
       
          <label
            htmlFor="blood-group"
            className="block mb-3 items-start font-bold mt-2"
          >
            Blood Group:
          </label>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Blood Group</InputLabel>
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

          {/* <select id="blood-group" value={bldgrp} onChange={(e) => setBldGrp(e.target.value)} className='block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400'>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
          </select> */}
          {/* 
          <div className="mb-4">
            <input type="checkbox" value="A+" onChange={handleChange}></input>
            <label style={{"color": "black"}}>A+</label> &nbsp;
            <input type="checkbox" value="A-" onChange={handleChange}></input> 
            <label style={{"color": "black"}}>A-</label> &nbsp;
            <input type="checkbox" value="B+" onChange={handleChange}></input>
            <label style={{"color": "black"}}>B+</label> &nbsp;
            <input type="checkbox" value="B-" onChange={handleChange}></input>
            <label style={{"color": "black"}}>B-</label> &nbsp;
            <input type="checkbox" value="O+" onChange={handleChange}></input>
            <label style={{"color": "black"}}>O+</label> &nbsp;
            <input type="checkbox" value="O-" onChange={handleChange}></input>
            <label style={{"color": "black"}}>O-</label> &nbsp;
            <input type="checkbox" value="AB+" onChange={handleChange}></input>
            <label style={{"color": "black"}}>AB+</label> &nbsp;
            <input type="checkbox" value="AB-" onChange={handleChange}></input> 
            <label style={{"color": "black"}}>AB-</label> &nbsp;
          </div> */}

          <h1 className="font-bold text-lg">Blood group selected:{bldgrp}</h1>

          <label
            htmlFor="bldAmount"
            className="block mb-2 text-sm font-lg font-bold"
          >
            Amount of blood to be donated:(in ml)
          </label>
          <input
            type="number"
            id="bldAmount"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/2 p-2.5 "
            placeholder="100"
            onChange={(e) => setAmountOfBlood(e.target.value)}
            required
          ></input>

          <h1>End Date of Donation:</h1>
          <DatePicker selected={enddate} onChange={(date) => setEndate(date)} className="bg-slate-400" />


          
          <label
            htmlFor="location"
            className="block mb-2 text-sm font-lg font-bold"
          >
            Location of Donation:
          </label>
          <input
            type="text"
            id="location"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/2 p-2.5 "
            placeholder="KMC Hospital"
            onChange={(e) => setLocation(e.target.value)}
            required
          ></input>

                    
          <label
            htmlFor="locationUrl"
            className="block mb-2 text-sm font-lg font-bold"
          >
            Google Maps Link:
          </label>
          <input
            type="text"
            id="location"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/2 p-2.5 "
            placeholder="https://maps.app.goo.gl/gJchueVcYryLveSz9"
            onChange={(e) => setlocUrl(e.target.value)}
            required
          ></input>

          <div>
            <FormControl>
              <FormLabel id="demo-radio-buttons-group-label">
                Donation Type
              </FormLabel>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="Whole_blood"
                name="radio-buttons-group"
                onChange={(e) => setDonationType(e.target.value)}
              >
                <FormControlLabel
                  value="Whole_blood"
                  control={<Radio />}
                  label="Whole blood"
                />
                <FormControlLabel
                  value="Single_donor_plasma"
                  control={<Radio />}
                  label="Single donor plasma"
                />
                <FormControlLabel
                  value="Granulocytes"
                  control={<Radio />}
                  label="Granulocytes"
                />
              </RadioGroup>
            </FormControl>
          </div>
          <div className="mt-5">
            <FormControl>
              <FormLabel id="demo-radio-buttons-group-label">
                Emergency Level
              </FormLabel>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="Normal_Drive"
                name="radio-buttons-group"
                onChange={(e) => setEmergencyLevel(e.target.value)}
              >
                <FormControlLabel
                  value="Mass_Casualty"
                  control={<Radio />}
                  label="Mass_Casualty"
                />
                <FormControlLabel
                  value="Immediate"
                  control={<Radio />}
                  label="Immediate"
                />
                <FormControlLabel
                  value="Normal_Drive"
                  control={<Radio />}
                  label="Normal_Drive"
                />
              </RadioGroup>
            </FormControl>
          </div>

          <button
            type="submit"
            className="w-full mt-5 text-white bg-emerald-400 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-2.5 py-2.5 text-center"
            onClick={createRequest}
          >
            Create Request
          </button>
          </form>

          <h2>Message: {message}</h2>
          <h3>Request Id: {reqId}</h3>
          <h3>Link: http://localhost:3000/donate/{reqId} </h3>

        
          <h1 className="text-2xl font-bold mt-5">Send Message</h1>
          <div className="mt-5">
            <textarea
              id="message"
              rows="4"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Type sms here.."
              value={smsText}
              onChange={(e) => setSmsText(e.target.value)}
            ></textarea>
          </div>
       
      <form onSubmit={handleSubmit} className="space-y-4 ">
        <div>
          <button
            type="submit"
            className="w-full mt-5 text-white bg-emerald-400 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-2.5 py-2.5 text-center"
            onClick={sendMessage}
          >
            Send Message
          </button>
        </div>
      </form>
      <div className="mt-10"></div>
    </div>
  );
};

export default SendMessage;
