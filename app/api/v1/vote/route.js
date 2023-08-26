import { getServerSession } from "next-auth";
import { connectDatabase } from "../../config/database";
import { authOptions } from "../../auth/[...nextauth]/route";
import { Vote } from "../../models/voteModel";
import { Feedback } from "../../models/feedbackModels";

(async function () {
  await connectDatabase();
})();

export const POST = async (request) => {
  const jsonBody = await request.json();
  const { feedbackId } = jsonBody;
  const session = await getServerSession(authOptions);

  const { email: userEmail } = session.user;

  const existingVote = await Vote.findOne({ feedbackId, userEmail });

  const feedBack = await Feedback.findById(feedbackId);

  if (existingVote) {
    const index = feedBack.vote.indexOf(existingVote._id);
    await Vote.findByIdAndDelete(existingVote._id);
    feedBack.vote.splice(index, 1);
    await feedBack.save();
    return Response.json({ message: "Removed Existing Vote" }, existingVote);
  } else {
    const vote = await Vote.create({ userEmail, feedbackId });
    feedBack.vote.unshift(vote._id);
    await feedBack.save();
    return Response.json(vote);
  }
};
