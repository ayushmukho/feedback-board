import Button from "./shared-components/Button";
import Popup from "./shared-components/Popup";
import FeedbackItemPopupComments from "./FeedbackItemPopupComments";
import API from "../services/feedbackService";
import { useEffect } from "react";
import Spinner from "../utils/svg/Spinner";
import Attachemnt from "./shared-components/Attachments";

export default function FeedbackItemPopup({
  _id,
  setShow,
  setLoadingVote,
  loadingVote,
  feddbackPopupItem,
}) {
  const { vote, title, description, uploads } = feddbackPopupItem;
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
        {uploads?.length > 0 && (
          <div className="mt-4">
            <span className="text-sm text-gray-600">Attachments:</span>
            <div className="flex gap-2 mt-4">
              {uploads.map((link, idx) => (
                <Attachemnt link={link} idx={idx} />
              ))}
            </div>
          </div>
        )}
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
        <FeedbackItemPopupComments id={_id} />
      </>
    </Popup>
  );
}
