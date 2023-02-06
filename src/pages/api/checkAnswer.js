import questionModel from "@/models/questionModel";
import userAnswerModel from "@/models/userAnswerModel";
import userModel from "@/models/userModel";
import connectDB from "@/utils/connectDB";

export default async function handler(req, res) {
  async function getScore(questionId, answer) {
    const question = await questionModel.findOne({
      _id: questionId,
    });
    const letters = question.letters;
    var score = 1;
    var checkIfAllLetters = true;
    for (var i = 0; i < answer.length; i++) {
      if (letters.includes(answer[i])) {
        score += 0.5;
      }
      if (!letters.includes(answer[i])) {
        checkIfAllLetters = false;
      }
    }
    if (checkIfAllLetters) {
      score += 5;
    }
    return score;
  }

  if (req.method === "POST") {
    try {
      await connectDB();
      const question = await questionModel.findOne({
        _id: req.body.questionId,
      });
      const answer = req.body.answer.toUpperCase();
      if (question.answers.includes(answer)) {
        res.status(200).json({ message: "Answer already exists" });
      } else {
        question.answers.push(answer);
        await question.save();
        if (
          await userAnswerModel.findOne({
            questionId: req.body.questionId,
            excelId: req.body.excelId,
          })
        ) {
          const userAnswer = await userAnswerModel.findOneAndUpdate(
            { questionId: req.body.questionId, excelId: req.body.excelId },
            {
              $inc: { totalScore: await getScore(req.body.questionId, answer) },
              $push: {
                score: {
                  point:await  getScore(req.body.questionId, answer),
                  answer: answer,
                },
              },
            }
          );
          await userAnswer.save();
        } else {
          const userAnswer = new userAnswerModel({
            questionId: req.body.questionId,
            excelId: req.body.excelId,
            score: {
              point:await getScore(req.body.questionId, answer),
              answer: answer,
            },
            totalScore: 1,
          });
          await userAnswer.save();
        }
        const user = await userModel.findOne({
          excelId: req.body.excelId,
        });
        user.score += getScore(req.body.questionId, answer);
        await user.save();
        res.status(200).json({ message: "Answer added" });
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
