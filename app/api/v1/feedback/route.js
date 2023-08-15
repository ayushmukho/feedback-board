import { connectDatabase } from "../../config/database";
import { Feedback } from "../../models/feedbackModels";

connectDatabase();

export const POST = async (request) => {
  const jsonBody = await request.json();
  const { title, description } = jsonBody;
  //const ip = "";
  await Feedback.create({ title, description });

  return Response.json(jsonBody);
};
