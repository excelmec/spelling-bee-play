import connectDB from "../../utils/connectDB";
import questionModel from "../../models/questionModel";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      await connectDB();
      console.log("questionModel", questionModel);
      const question = await questionModel
        .findOne({})
        .sort({ releaseTime: -1 });
      res.status(200).json(question);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  } else if (req.method === "POST") {
    try {
      await connectDB();
      const question = new questionModel({
        letters: req.body.letters.map((letter) => letter.toUpperCase()),
        mainLetter: req.body.mainLetter.toUpperCase(),
        answers: [],
        releaseTime: new Date(),
      });
      await question.save();
      res.status(200).json({ message: "Question created" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
