import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import FeedbackItem from "./FeedbackItem";
import FeedbackFromPopup from "./FeedbackFromPopup";
import FeedbackItemPopup from "./FeedbackItemPopup";
import API from "../services/feedbackService";
import Skeleton from "../utils/svg/Skeleton";
import Button from "./shared-components/Button";

export default function Board() {
  const [showFeedbackPopupFrom, setShowFeedbackPopupForm] = useState(false);
  const [showFeedbackPopupItem, setShowFeedbackPopupItem] = useState(null);
  const [loadingVote, setLoadingVote] = useState([]);
  const [loading, setloading] = useState(true);
  const [feedback, setFeedback] = useState([]);

  const { data: session } = useSession();

  const feedbackServiceApi = new API();

  useEffect(() => {
    feedbackServiceApi.getAllFeedbackPost().then((res) => {
      setFeedback(res.data);
      setloading(false);
    });
  }, [feedback, loading, loadingVote]);

  useEffect(() => {
    if (session?.user?.email) {
      const feedbackId = localStorage.getItem("vote_after_login");
      if (feedbackId) {
        feedbackServiceApi.voteForPost({ feedbackId }).then((res) => {
          console.log(res);
        });
        localStorage.removeItem("vote_after_login");
      }
    }
  }, [session?.user?.email]);

  const openFeedbackModalForm = () => {
    setShowFeedbackPopupForm((prev) => !prev);
  };
  const openFeedbackModalItem = (feedback) => {
    setShowFeedbackPopupItem(feedback);
  };
  return (
    <main className="bg-white md:max-w-2xl mx-auto shadow-lg md:rounded-lg md:mt-8 overflow-hidden">
      {session?.user?.email || null}
      <div className="bg-gradient-to-r from-cyan-400 to-blue-400 p-8">
        <h1 className="font-bold text-xl">Coding with Mukho</h1>
        <p className="text-opacity-90 text-slate-700">
          Help me decide what should I build next!!!
        </p>
      </div>
      <div className="bg-gray-100 px-8 py-4 flex border-b">
        <div className="grow"></div>
        <>
          <Button primary="true" onClick={openFeedbackModalForm}>
            Make Suggestion
          </Button>
        </>
      </div>
      <div className="px-8">
        {loading ? (
          <div className="gap-8 my-8 items-center">
            <Skeleton />
          </div>
        ) : (
          feedback.map((feedback, idx) => (
            <FeedbackItem
              key={idx}
              setLoadingVote={setLoadingVote}
              loadingVote={loadingVote}
              {...feedback}
              openModal={() => openFeedbackModalItem(feedback)}
            />
          ))
        )}
      </div>
      {showFeedbackPopupFrom && (
        <FeedbackFromPopup setShow={setShowFeedbackPopupForm} />
      )}
      {showFeedbackPopupItem && (
        <FeedbackItemPopup
          {...showFeedbackPopupItem}
          setShow={setShowFeedbackPopupItem}
        />
      )}
    </main>
  );
}
