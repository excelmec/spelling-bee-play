import userModel from "@/models/userModel";
import connectDB from "@/utils/connectDB";
import axios from "axios";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      await connectDB();
      await axios
        .get(process.env.PROFILE_BACKEND_URL + "/profile/view", {
          headers: {
            Authorization: req.headers.authorization,
          },
        })
        .then((response) => {
          const data = response.data;
          const user = new userModel({
            name: data.name,
            email: data.email,
            excelId: data.id,
            score: 0,
          });
          user.save();
        });
      res.status(200).json({ message: "User created" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
