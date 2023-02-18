import axios from "axios";
import AuthHandler from "../auth/authHandler";
import { toast } from "react-hot-toast";

export const api = axios.create({
  baseURL: "/api",
});

export const postAnswer = async (
  qnId,
  answer,
  mainLetter,
  setUserWord,
  refresh,
  answers,
  setLoading,
  setRefresh
) => {
  if (answers.length >= 3) {
    if (answer.length < 4) {
      setLoading(false);
      setUserWord("");
      return toast.error("Answer must be at least 4 characters");
    }
    let temp = false;
    for (let i = 0; i < answer.length; i++) {
      if (answer[i] === mainLetter) {
        temp = true;
        break;
      }
    }
    if (!temp) {
      setLoading(false);
      setUserWord("");
      return toast.error("Answer must contain the main letter");
    }
    const dictionary = await axios.get(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${answer}`
    );
    console.log(dictionary);
    if (dictionary.data[0].word.toUpperCase() === answer) {
      console.log("here");
      try {
        const response = await api.post(
          "/checkAnswer",
          {
            questionId: qnId,
            answer: answer,
          },
          {
            headers: {
              authorization: `Bearer ${await AuthHandler.aysncGetAccessToken()}`,
            },
          }
        );
        toast.success(response.data.message);

        setUserWord("");
        setLoading(false);
        if (response.status === 200) {
          setRefresh(!refresh);
        }
        return response.data;
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.message);
        setUserWord("");
        setLoading(false);
      }
    }
  } else {
    if (answer.length < 4) {
      setLoading(false);
      setUserWord("");
      return toast.error("Answer must be at least 4 characters");
    }
    const dictionary = await axios.get(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${answer}`
    );
    if (dictionary.data[0].word === answer) {
      try {
        const response = await api.post(
          "/checkAnswer",
          {
            questionId: qnId,
            answer: answer,
          },
          {
            headers: {
              authorization: `Bearer ${await AuthHandler.aysncGetAccessToken()}`,
            },
          }
        );
        toast.success(response.data.message);

        setUserWord("");
        setLoading(false);
        if (response.status === 200) {
          setRefresh(!refresh);
        }

        return response.data;
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.message);
        setUserWord("");
        setLoading(false);
      }
    }
  }
};

export const getQuestion = async () => {
  const response = await api.get("/question");
  return response.data;
};
