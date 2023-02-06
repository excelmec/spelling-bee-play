import userAnswerModel from "@/models/userAnswerModel";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const excelId = req.body.excelId;
    const data = await userAnswerModel.find({ excelId: excelId });
    res.status(200).json(data);
  }
}