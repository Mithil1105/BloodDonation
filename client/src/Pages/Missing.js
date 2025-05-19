import { useNavigate } from "react-router-dom";
import React from "react";

const Missing = () => {
  const navigate = useNavigate(); //useNavigate is a hook that returns a navigate function

  const goBack = () => navigate(-1); //navigate(-1) is the same as clicking the back button on the browser

  return (
    <div className="text-center h-screen">
      <div className="font-bold text-2xl">Missing</div>
      <button
        className="mt-5 text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-lg px-2.5 py-2.5 text-center"
        onClick={goBack}
      >
        Go Back
      </button>
    </div>
  );
};

export default Missing;
