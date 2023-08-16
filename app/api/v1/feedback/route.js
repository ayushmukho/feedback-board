import { connectDatabase } from "../../config/database";
import { Feedback } from "../../models/feedbackModels";

connectDatabase();

export const POST = async (request) => {
  const jsonBody = await request.json();
  const { title, description, uploads } = jsonBody;
  //const ip = "";
  await Feedback.create({ title, description, uploads });

  return Response.json(jsonBody);
};
