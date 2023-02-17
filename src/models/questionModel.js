import { model, models, Schema } from "mongoose";

const questionSchema = new Schema(
  {
    letters: {
      type: [String],
      required: true,
    },
    mainLetter: {
      type: String,
      required: true,
    },
    answers: {
      type: Array,
    },
    active: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

const questionModel = models.question || model("question", questionSchema);
export default questionModel;
