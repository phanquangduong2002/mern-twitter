import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import Tweet from "../Tweet/Tweet";

import { apiUrl } from "../../api/constants";

const TimelineTweet = () => {
  const [timeLine, setTimeLine] = useState(null);

  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const timelineTweets = await axios.get(
          `${apiUrl}/tweets/timeline/${currentUser._id}`
        );

        setTimeLine(timelineTweets.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [currentUser._id]);

  return (
    <div className="mt-6">
      {timeLine &&
        timeLine.map((tweet) => (
          <div key={tweet._id} className="p-2">
            <Tweet tweet={tweet} setData={setTimeLine} />
          </div>
        ))}
    </div>
  );
};

export default TimelineTweet;
