import questionModel from "@/models/questionModel";
import connectDB from "@/utils/connectDB";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      await connectDB();
      const questions = await questionModel.find({});
      res.status(200).json(questions);
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
