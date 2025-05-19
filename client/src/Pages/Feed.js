import React, { useEffect, useState } from "react";
import FeedCard from "../Components/FeedCard";
import axios from "../axios";

const Feed = () => {
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

  return (
    <div className="pl-2 pr-2 pt-2 h-full pb-10 lg:p-10">
      <h1 className="font-bold text-4xl">My Feed</h1>
      <div className="mt-10">
        {requests.map((request, index) => (
          <FeedCard key={index} request={request} />
        ))}
      </div>
    </div>
  );
};

export default Feed;
