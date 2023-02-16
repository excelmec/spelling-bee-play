import userModel from "../../models/userModel";
import connectDB from "../../utils/connectDB";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      await connectDB();
      const user = await userModel.findOne(
        {
          email: req.body.email,
        },
        {
          name: 1,
          email: 1,
          _id: 0,
        }
      );
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
