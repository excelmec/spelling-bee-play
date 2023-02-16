import { model, models, Schema } from "mongoose";

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  picture: {
    type: String,
    required: true,
  },
  excelId: {
    type: Number,
    required: true,
  },
  score: {
    type: Number,
    required: true,
  },
});

const userModel = models.user || model("user", userSchema);

export default userModel;
