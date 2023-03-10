import questionModel from "../../models/questionModel";
import userAnswerModel from "../../models/userAnswerModel";
import userModel from "../../models/userModel";
import connectDB from "../../utils/connectDB";
import axios from "axios";

export default async function handler(req, res) {
  var checkWord = require("check-word"),
    words = checkWord("en");
  async function getScore(questionId, answer) {
    const question = await questionModel.findOne({
      _id: questionId,
    });
    const letters = question.letters.concat(question.mainLetter);
    var score = 0;
    var checkIfAllLetters = true;
    for (var i = 0; i < answer.length; i++) {
      if (letters.includes(answer[i])) {
        score += 1;
      }
      if (!letters.includes(answer[i])) {
        checkIfAllLetters = false;
      }
    }
    if (checkIfAllLetters && answer.length === letters.length) {
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
      // console.log(req.body);
      const accessToken = req.headers.authorization.split(" ")[1];
      //console.log(accessToken);
      if (answer.length < 4) {
        res.status(500).json({ message: "Answer is not a valid word." });
        return;
      }

      const response = await axios.get(
        process.env.NEXT_PUBLIC_PROFILE_BACKEND_URL + "/profile/view",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const name = response.data.name;
      const email = response.data.email;
      const excelId = response.data.id;
      const userAnswers = await userAnswerModel.findOne({
        excelId: excelId,
        questionId: req.body.questionId,
      });
      if (userAnswers) {
        if (userAnswers.score.find((s) => s.answer === answer)) {
          res
            .status(200)
            .json({ message: "You have already answered this word" });
          return;
        }
        if (userAnswers.score.length >= 4) {
          let temp = false;
          for (let i = 0; i < answer.length; i++) {
            if (answer[i] === question.mainLetter) {
              temp = true;
              break;
            }
          }
          if (!temp) {
            res.status(500).json({ message: "Main Letter Not Present." });
            return;
          }
        }
      }
      for (let i = 0; i < answer.length; i++) {
        let tempLetters = question.letters.concat(question.mainLetter);
        if (!tempLetters.includes(answer[i])) {
          res.status(500).json({ message: "Invalid Word" });
          return;
        }
      }
      const aldreadyAnswered = question.answers.find(
        (a) => a.answer === answer
      );
      const answerEntered = aldreadyAnswered?.name;
      if (aldreadyAnswered) {
        if (
          await userAnswerModel.findOne({
            questionId: req.body.questionId,
            excelId: excelId,
          })
        ) {
          const userAnswer = await userAnswerModel.findOneAndUpdate(
            { questionId: req.body.questionId, excelId: excelId },
            {
              $inc: { totalScore: await getScore(req.body.questionId, answer) },
              $push: {
                score: {
                  point: await getScore(req.body.questionId, answer),
                  answer: answer,
                },
              },
            }
          );
          await userAnswer.save();
        } else {
          const userAnswer = new userAnswerModel({
            questionId: req.body.questionId,
            excelId: excelId,
            score: {
              point: await getScore(req.body.questionId, answer),
              answer: answer,
            },
            totalScore: await getScore(req.body.questionId, answer),
          });
          await userAnswer.save();
        }
        const user = await userModel.findOne({
          excelId: excelId,
        });
        user.score += await getScore(req.body.questionId, answer);
        await user.save();
        res.status(200).json({
          message: answerEntered + " coined the word.",
          answer: aldreadyAnswered,
        });
      } else {
        if (words.check(answer.toLowerCase()) === true) {
          question.answers.push({
            answer: answer,
            name: name,
            email: email,
            excelId: excelId,
          });
          await question.save();
          if (
            await userAnswerModel.findOne({
              questionId: req.body.questionId,
              excelId: excelId,
            })
          ) {
            const userAnswer = await userAnswerModel.findOneAndUpdate(
              { questionId: req.body.questionId, excelId: excelId },
              {
                $inc: {
                  totalScore: await getScore(req.body.questionId, answer),
                },
                $push: {
                  score: {
                    point: await getScore(req.body.questionId, answer),
                    answer: answer,
                  },
                },
              }
            );
            await userAnswer.save();
          } else {
            const userAnswer = new userAnswerModel({
              questionId: req.body.questionId,
              excelId: excelId,
              score: {
                point: await getScore(req.body.questionId, answer),
                answer: answer,
              },
              totalScore: await getScore(req.body.questionId, answer),
            });
            await userAnswer.save();
          }
          const user = await userModel.findOne({
            excelId: excelId,
          });
          user.score += await getScore(req.body.questionId, answer);
          await user.save();
          res.status(200).json({ message: "Answer added" });
        } else {
          res.status(500).json({ message: "Answer is not a valid word." });
          return;
        }
      }
    } catch (err) {
      //le.log(err);
      res.status(500).json({ error: err.message });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
