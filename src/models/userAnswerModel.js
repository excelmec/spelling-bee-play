import { model, models, Schema } from "mongoose";

const userAnswerSchema = new Schema({
  excelId: {
    type: Number,
    required: true,
  },
  questionId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "question",
  },
  score: {
    type: Array,
    required: true,
  },
  totalScore: {
    type: Number,
    required: true,
  },
});

const userAnswerModel =
  models.userAnswerModel || model("userAnswerModel", userAnswerSchema);

export default userAnswerModel;
