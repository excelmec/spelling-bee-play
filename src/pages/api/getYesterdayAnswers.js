import connectDB from "../../utils/connectDB";
import questionModel from "../../models/questionModel";

export default async function handler(req, res) {
  if (req.method === "GET") {
    await connectDB();
    const question = await questionModel
      .find({
        active: true,
      })
      .sort({ createdAt: -1 });
    if (question.length === 0) {
      res.status(404).json({ message: "Question not found" });
      return;
    }
    res.status(200).json(question[1]);
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
