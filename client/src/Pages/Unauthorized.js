import { useNavigate } from "react-router-dom";
import React from "react";

const Unauthorized = () => {
  const navigate = useNavigate();

  const goBack = () => navigate(-1);

  return (
    <div className="text-center h-screen">
      <h1 className="font-bold text-2xl">Unauthorized</h1>
      <p>You do not have access to the requested page</p>
      <button
        className="mt-5 text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-lg px-2.5 py-2.5 text-center"
        onClick={goBack}
      >
        Go Back
      </button>
    </div>
  );
};

export default Unauthorized;
