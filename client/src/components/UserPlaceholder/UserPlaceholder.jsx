import axios from "axios";
import React, { useState, useEffect } from "react";

import { useLocation, useParams } from "react-router-dom";

import { apiUrl } from "../../api/constants";

const UserPlaceholder = ({ setUserData, userData }) => {
  const { id } = useParams();
  const location = useLocation().pathname;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userProfile = await axios.get(`${apiUrl}/users/find/${id}`);
        setUserData(userProfile.data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, [id]);

  return <div>{userData?.username}</div>;
};

export default UserPlaceholder;
