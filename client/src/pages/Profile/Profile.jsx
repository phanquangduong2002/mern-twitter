import React, { useEffect, useState } from "react";
import LeftSidebar from "../../components/LeftSidebar/LeftSidebar";
import RightSidebar from "../../components/RightSidebar/RightSidebar";

import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Tweet from "../../components/Tweet/Tweet";
import EditProfile from "../../components/EditProfile/EditProfile";
import { following } from "../../redux/userSlice";

import { apiUrl } from "../../api/constants";

const Profile = () => {
  const [open, setOpen] = useState(false);
  const [userTweets, setUserTweets] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const { currentUser } = useSelector((state) => state.user);

  const { id } = useParams();
  const dispatch = useDispatch();

  const handleFollow = async () => {
    if (!currentUser.following.includes(id)) {
      try {
        const follow = await axios.put(`${apiUrl}/users/follow/${id}`, {
          id: currentUser._id,
        });
        dispatch(following(id));
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const unfollow = await axios.put(`${apiUrl}/users/unfollow/${id}`, {
          id: currentUser._id,
        });

        dispatch(following(id));
      } catch (error) {
        console.log(error);
      }
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userTweets = await axios.get(`${apiUrl}/tweets/user/all/${id}`);
        const userProfile = await axios.get(`${apiUrl}/users/find/${id}`);

        setUserTweets(userTweets.data);
        setUserProfile(userProfile.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [currentUser, id]);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-4">
        <div className="px-6">
          <LeftSidebar />
        </div>
        <div className="col-span-2 border-x-2 border-t-slate-800 px-6">
          <div className="flex justify-between items-center">
            {currentUser.profilePicture != null && (
              <img
                src={userProfile?.profilePicture}
                alt="Profile Picture"
                className="w-12 h-12 rounded-full"
              />
            )}
            {currentUser._id === id ? (
              <button
                onClick={() => setOpen(true)}
                className="px-4 py-2 bg-blue-500 rounded-full text-white"
              >
                Edit Profile
              </button>
            ) : currentUser.following.includes(id) ? (
              <button
                onClick={handleFollow}
                className="px-4 py-2 bg-blue-500 rounded-full text-white"
              >
                Following
              </button>
            ) : (
              <button
                onClick={handleFollow}
                className="px-4 py-2 bg-blue-500 rounded-full text-white"
              >
                Follow
              </button>
            )}
          </div>
          <div className="mt-6">
            {userTweets &&
              userTweets.map((tweet) => (
                <div className="p-2" key={tweet._id}>
                  <Tweet tweet={tweet} setData={setUserTweets} />
                </div>
              ))}
          </div>
        </div>
        <div className="px-6">
          <RightSidebar />
        </div>
      </div>
      {open && <EditProfile setOpen={setOpen} />}
    </>
  );
};

export default Profile;
