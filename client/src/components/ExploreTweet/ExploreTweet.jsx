import React, { useEffect, useState } from "react";

import axios from "axios";
import { useSelector } from "react-redux";
import Tweet from "../Tweet/Tweet";

import { apiUrl } from "../../api/constants";

const ExploreTweets = () => {
  const [explore, setExplore] = useState(null);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const exploreTweets = await axios.get(`${apiUrl}/tweets/explore`);
        setExplore(exploreTweets.data);
        console.log(explore);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [currentUser._id]);
  return (
    <div className="mt-6">
      {explore &&
        explore.map((tweet) => {
          return (
            <div key={tweet._id} className="p-2">
              <Tweet tweet={tweet} setData={setExplore} />
            </div>
          );
        })}
    </div>
  );
};

export default ExploreTweets;
