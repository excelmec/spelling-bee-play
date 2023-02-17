import axios from "axios";
import userModel from "../../models/userModel";
import connectDB from "../../utils/connectDB";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      await connectDB();
      await axios
        .get(process.env.NEXT_PUBLIC_PROFILE_BACKEND_URL + "/profile/view", {
          headers: {
            Authorization: req.body.headers.Authorization,
          },
        })
        .then(async (response) => {
          const checkUser = await userModel.findOne({
            email: response.data.email,
          });
          if (checkUser?.email)
            return res.status(200).json({ message: "User already exists" });
          const data = response.data;
          const user = await new userModel({
            name: data.name,
            email: data.email,
            picture: data.picture,
            excelId: data.id,
            score: 0,
          });
          await user.save();
          res.status(200).json({ message: "User created" });
        });
      
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
