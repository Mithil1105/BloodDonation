import React from 'react'
import { useState, useEffect } from 'react'
import axios from '../axios';
import toast from 'react-hot-toast'

const CurrentRequests = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    
    axios
      .get(`/user/getRequests`)
      .then((response) => {
        setRequests(response.data);
      })
      .catch((error) => {
        console.error("Error fetching requests:", error);
      });
  }, []);

   
  const deleteReq = (reqId) => {
    axios.delete(`/user/delReq/${reqId}`)
        .then((response) => {
        console.log(response);
        toast.success('Request Deleted!')
        const newList = requests.filter((item) => item.request_id !== reqId);
        setRequests(newList);
      })
      .catch((error) => 
      {
        toast.error('Error in deletion!')
        console.log(error)
      })
  }

  return (
    <div className='font-cust1'>
      <div className='flex flex-row space-x-16 p-5 bg-red-200 mt-2 font-semibold'>
            <p className='w-20'>Request Id</p>
           <p  className='w-20'>Bld Group Reqd.</p>
           <p  className='w-20'>Amt Reqd.</p>
           <p className='w-20'>Interested Donors</p>
      </div>
      {requests.map((requests,index) => (
        <div className='flex flex-row space-x-16 p-5 bg-red-100 mt-2'> 
           <p className='w-20'>{requests?.request_id}</p>
           <p className='w-20'>{requests?.bldGrpRequired}</p>
           <p className='w-20'>{requests?.amount_Required}</p>
           <p className='w-20'>{requests?.noOfInterestedDonors}</p>
           <button className='focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2' onClick={() => deleteReq(requests.request_id)}>Delete</button>
        </div>
       
      ))}
    </div>
  )
}

export default CurrentRequests