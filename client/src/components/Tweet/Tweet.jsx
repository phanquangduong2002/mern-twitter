import axios from "axios";
import React, { useEffect, useState } from "react";

import { useSelector } from "react-redux";
import formatDistance from "date-fns/formatDistance";
import { Link, useLocation, useParams } from "react-router-dom";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

import { apiUrl } from "../../api/constants";

const Tweet = ({ tweet, setData }) => {
  const { currentUser } = useSelector((state) => state.user);

  const [userData, setUserData] = useState();

  const location = useLocation().pathname;
  const { id } = useParams();

  const dateStr = formatDistance(new Date(tweet.createdAt), new Date());

  useEffect(() => {
    const fetchData = async () => {
      try {
        const findUser = await axios.get(
          `${apiUrl}/users/find/${tweet.userId}`
        );

        setUserData(findUser.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [tweet.userId, tweet.likes]);

  const handleLike = async (e) => {
    e.preventDefault();

    try {
      const like = await axios.put(`${apiUrl}/tweets/${tweet._id}/like`, {
        id: currentUser._id,
      });

      if (location.includes("profile")) {
        const newData = await axios.get(`${apiUrl}/tweets/user/all/${id}`);
        setData(newData.data);
      } else if (location.includes("explore")) {
        const newData = await axios.get(`${apiUrl}/tweets/explore`);
        setData(newData.data);
      } else {
        const newData = await axios.get(
          `${apiUrl}/tweets/timeline/${currentUser._id}`
        );
        setData(newData.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {userData && (
        <>
          <div className="flex space-x-2">
            <Link to={`/profile/${userData._id}`}>
              <h3 className="font-bold">{userData.username}</h3>
            </Link>
            <span className="font-normal">@{userData.username}</span>
            <p> - {dateStr}</p>
          </div>

          <p>{tweet.description}</p>
          <button onClick={handleLike}>
            {tweet.likes.includes(currentUser._id) ? (
              <FavoriteIcon className="mr-2 my-2 cursor-pointer" />
            ) : (
              <FavoriteBorderIcon className="mr-2 my-2 cursor-pointer" />
            )}
            {tweet.likes.length}
          </button>
        </>
      )}
    </div>
  );
};

export default Tweet;
