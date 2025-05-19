import React from 'react'
import { useState, useEffect } from 'react';
import axios from '../axios';
import ArrowCircleLeftRoundedIcon from '@mui/icons-material/ArrowCircleLeftRounded';
import { useAuth } from "../Hooks/useAuth";
import { Link } from 'react-router-dom';
import { PDFDownloadLink } from '@react-pdf/renderer';
import PDFFile from '../Components/PDFFile.js';

const UserDonationHistory = () => {
    const auth = useAuth();
    const [donations, setDonations] = useState([]);

    const userID = auth?.auth?.donor_id;

    useEffect(() => {
        async function fetchData() {
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
        }
        fetchData();
      }, []);

  return (
    <div>
    <Link to='/dashboard' className='text-xl ml-20'>
    <ArrowCircleLeftRoundedIcon className='mr-2'/>
      Dashboard</Link>
    <div className='flex flex-col items-center justify-center mx-auto px-2 py-2 lg:px-6 lg:py-6'>
        <h1 className="font-bold text-4xl">My Donations</h1>
        <div className="w-full mt-5 rounded-lg shadow h-screen lg:p-5">
            <TableHeader/>

            {donations.map((donation, index) => (
                      <TableRow key={index} donation={donation} />
            ))}
        </div>
    </div>
    </div>
  )
}

const TableHeader = () => {
    return (
      <div>
        <div className="grid grid-cols-4 gap-2 font-semibold text-lg pt-5 pb-5 pl-2">
          <div>Date</div>
          <div>Amt. (ml)</div>
          <div>Type</div>
          <div>Certificate</div>
        </div>
      </div>
    );
  };

  
const TableRow = ({ donation }) => {
    return (
      <div>
        <div className="grid grid-cols-4 gap-4 text-md pt-5 pb-5 font-poppins">
          <div>{donation?.dateOfDonation}</div>
          <div>{donation?.amount_Donated}</div>
          <div>{donation?.donation_id}</div>
          <div className="pdf">
            <PDFDownloadLink document={<PDFFile />} filename="FORM">
            {({loading}) => (loading ? <button>Loading Document...</button> : <button>Download</button> )}
            </PDFDownloadLink>
            {/* <PDFFile /> */}
            </div>
          
        </div>
      </div>
    );
  };
  

const PDF = () => {
  return (
    <PDFDownloadLink document={<PDFFile />} fileName="somename.pdf">
      {({ blob, url, loading, error }) =>
        loading ? <button>Loading Document</button> : <button>Download</button>
      }
    </PDFDownloadLink>
  )
  }

export default UserDonationHistory