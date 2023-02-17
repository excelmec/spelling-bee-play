import axios from "axios";
import AuthHandler from "../auth/authHandler";
import { toast } from "react-hot-toast";

export const api = axios.create({
  baseURL: "/api",
});

export const postAnswer = async (qnId, answer) => {
  if (answer.length < 3) return toast.error("Answer must be at least 3 characters");
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
    return response.data;
  } catch (error) {
    toast.error(error.response.data.message);
  }
};

export const getQuestion = async () => {
  const response = await api.get("/question");
  return response.data;
};
