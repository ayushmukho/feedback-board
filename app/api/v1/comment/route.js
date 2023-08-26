import { getServerSession } from "next-auth";
import { connectDatabase } from "../../config/database";
import { Comment } from "../../models/commentModel";
import { authOptions } from "../../auth/[...nextauth]/route";

(async function () {
  await connectDatabase();
})();

export const POST = async (request) => {
  const jsonBody = await request.json();
  const session = await getServerSession(authOptions);
  const { text, uploads } = jsonBody;
  const userEmail = session.user.email;
  const comment = await Comment.create({ text, userEmail, uploads });

  return Response.json(comment);
};

export const GET = async () => {
  return Response.json(await Feedback.find()?.populate("vote"));
};
