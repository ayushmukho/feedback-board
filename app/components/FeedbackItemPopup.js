import Button from "./shared-components/Button";
import Popup from "./shared-components/Popup";
import FeedbackItemPopupComments from "./FeedbackItemPopupComments";
import API from "../services/feedbackService";
import { useEffect } from "react";
import Spinner from "../utils/svg/Spinner";

export default function FeedbackItemPopup({
  _id,
  setShow,
  setLoadingVote,
  loadingVote,
  feddbackPopupItem,
}) {
  const { vote, title, description } = feddbackPopupItem;
  const feedbackServiceApi = new API();
  const handleVote = async (e) => {
    const newVoteArray = [...loadingVote, _id];
    setLoadingVote(newVoteArray);
    await feedbackServiceApi.voteForPost({ feedbackId: _id });
    setLoadingVote(false);
    const updatedArray = loadingVote.filter((itm) => itm !== _id);
    setLoadingVote(updatedArray);
  };
  return (
    <Popup title={""} setShow={setShow}>
      <div className="p-8 pb-2">
        <h2 className="text-lg font-bold mb-2">{title}</h2>
        <p className="text-gray-600"> {description}</p>
      </div>
      <div className="flex justify-end px-8 py-2 border-b">
        <Button onClick={handleVote} primary="true">
          {loadingVote.length !== 0 ? (
            <>
              <div>voting... </div>
              <Spinner primary={true} />
            </>
          ) : (
            <>
              <span className="triangle-vote-up"></span>
              <div>Upvote {vote?.length || 0}</div>
            </>
          )}
        </Button>
      </div>
      <>
        <FeedbackItemPopupComments />
      </>
    </Popup>
  );
}
