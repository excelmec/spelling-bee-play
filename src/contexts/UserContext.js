import axios from "axios";
import React, { useEffect } from "react";
import { createContext } from "react";
import AuthHandler from "../auth/authHandler";

export const UserContext = createContext();

function UserDetails(props) {
  const [profile, setProfile] = React.useState();
  const [isPlayerRegistered, setIsPlayerRegistered] = React.useState(false);
  const getProfile = async (access_token) => {
    await axios
      .get(`${process.env.NEXT_PUBLIC_PROFILE_BACKEND_URL}/Profile`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
      .then((response) => {
        setProfile(response.data);
      });
  };

  const checkRegistration = async () => {
    if (!profile) return;
    await axios
      .post(`/api/checkRegistration`, {
        email: profile.email,
      })
      .then((response) => {
        if (response.data) {
          setIsPlayerRegistered(true);
        }
      });
  };

  useEffect(() => {
    checkRegistration();
  }, [profile]);

  useEffect(() => {
    if (localStorage.getItem("refreshToken")) {
      AuthHandler.aysncGetAccessToken(
        localStorage.getItem("refreshToken")
      ).then((access_token) => {
        if (access_token) {
          getProfile(access_token);
        }
      });
    } else {
      let index = window.location.href.indexOf("?");
      const searchString = window.location.href.slice(index);
      const urlParams = new URLSearchParams(searchString);
      const refreshToken = urlParams.get("refreshToken");
      if (refreshToken) localStorage.setItem("refreshToken", refreshToken);
      AuthHandler.aysncGetAccessToken(refreshToken).then((access_token) => {
        if (access_token) {
          getProfile(access_token);
        }
      });

      if (index >= 0) {
        window.open(window.location.href.slice(0, index), "_self");
      }
    }
    // eslint-disable-next-line
  }, []);

  return (
    <UserContext.Provider
      value={{
        profile,
        isPlayerRegistered,
        setIsPlayerRegistered,
        setProfile,
        getProfile,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
}

export default UserDetails;
