import axios from "axios";
import React, { useEffect } from "react";
import { createContext } from "react";
import AuthHandler from "../auth/authHandler";

export const UserContext = createContext();

function UserDetails(props) {
  const [profile, setProfile] = React.useState();
  const [refresh, setRefresh] = React.useState(false);
  const [yesterdayQuestion, setYesterdayQuestion] = React.useState();
  const [score, setScore] = React.useState(0);
  const [answers, setAnswers] = React.useState([]);
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

  const fetchYesterdayQuestion = async () => {
    const response = await axios.get("/api/getYesterdayAnswers");
    //console.log(response.data);
    setYesterdayQuestion(response.data);
  };

  useEffect(() => {
    checkRegistration();
  }, [profile]);

  useEffect(() => {
    try {
      if (localStorage.getItem("refreshToken")) {
        AuthHandler.aysncGetAccessToken(
          localStorage.getItem("refreshToken")
        ).then((access_token) => {
          if (access_token) {
            getProfile(access_token);
          } else {
            localStorage.removeItem("refreshToken");
          }
        });
      } else {
        let index = window.location.href.indexOf("?");
        const searchString = window.location.href.slice(index);
        const urlParams = new URLSearchParams(searchString);
        const refreshToken = urlParams.get("refreshToken");
        if (refreshToken) {
          localStorage.setItem("refreshToken", refreshToken);
          AuthHandler.aysncGetAccessToken(refreshToken).then((access_token) => {
            if (access_token) {
              getProfile(access_token);
            }
          });
        }

        if (index >= 0) {
          window.open(window.location.href.slice(0, index), "_self");
        }
      }
    } catch (err) {
      alert("Enable Third Party Cookies in your Browser Settings.");
    }
    // eslint-disable-next-line
  }, []);

  const getTodaysUserAnswers = async () => {
    const question = await axios.get("/api/question");
    const questionId = question.data._id;
    const refreshToken = localStorage.getItem("refreshToken");
    AuthHandler.aysncGetAccessToken(refreshToken).then(async (access_token) => {
      if (access_token) {
        try {
          const response = await axios.post(
            "/api/getTodayScoreAndAnswersByUser",
            {
              questionId: await questionId,
            },
            {
              headers: {
                authorization: `Bearer ${access_token}`,
              },
            }
          );
          setScore(response.data.totalScore);
          let temp = [];
          response.data.score.map((answer) => {
            temp.push(answer.answer);
          });
          setAnswers(temp);
        } catch (err) {}
      }
    });
  };

  useEffect(() => {
    getTodaysUserAnswers();
  }, [refresh]);

  useEffect(() => {
    fetchYesterdayQuestion();
  }, []);

  return (
    <UserContext.Provider
      value={{
        profile,
        isPlayerRegistered,
        yesterdayQuestion,
        score,
        answers,
        refresh,
        setRefresh,
        setYesterdayQuestion,
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
