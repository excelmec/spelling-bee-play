import userModel from "@/models/userModel";
import connectDB from "@/utils/connectDB";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      await connectDB();
      const users = await userModel
        .find(
          {},
          {
            name: 1,
            score: 1,
            _id: 0,
          }
        )
        .sort({ score: -1 });
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
