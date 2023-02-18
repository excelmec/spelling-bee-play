import NextCors from "nextjs-cors";
import userModel from "../../models/userModel";
import connectDB from "../../utils/connectDB";

export default async function handler(req, res) {
  await NextCors(req, res, {
    // Options
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    origin: "*",
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  });
  if (req.method === "POST") {
    await connectDB();
    const { email } = req.body;
    const users = await userModel.find({}).sort({ score: -1 });
    const rank = users.findIndex((user) => user.email === email) + 1;
    if (rank === 0) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.status(200).json({ rank });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
