import userAnswerModel from "../../models/userAnswerModel";
import axios from "axios";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const accessToken = req.headers.authorization;
    if (!accessToken) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
    const response = await axios.get(
      process.env.PROFILE_BACKEND_URL + "/profile/view",
      {
        headers: {
          Authorization: accessToken,
        },
      }
    );
    const excelId = response.data.id;
    const data = await userAnswerModel.find({ excelId: excelId });
    res.status(200).json(data);
  }
}
