import axios from "axios";
import userAnswerModel from "../../models/userAnswerModel";
import connectDB from "../../utils/connectDB";

export default async function handler(req, res) {
  if (req.method === "POST") {
    await connectDB();
    const questionId = req.body.questionId;
    const accessToken = req.headers.authorization.split(" ")[1];
    console.log(accessToken);
    const response = await axios.get(
      process.env.NEXT_PUBLIC_PROFILE_BACKEND_URL + "/profile/view",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const excelId = response.data.id;
    const userAnswers = await userAnswerModel.findOne({
      excelId: excelId,
      questionId: questionId,
    });
    if (userAnswers) {
      res.status(200).json(userAnswers);
      return;
    }
    res.status(404).json({ message: "User Answer not found" });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
