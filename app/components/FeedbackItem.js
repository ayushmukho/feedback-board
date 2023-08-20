"use client";
import { useState } from "react";
import Popup from "./shared-components/Popup";
import Button from "./shared-components/Button";
import { signIn, useSession } from "next-auth/react";
import API from "../services/feedbackService";
import Spinner from "../utils/svg/Spinner";

export default function FeedbackItem({
  openModal,
  _id,
  title,
  description,
  vote,
  setLoadingVote,
  loadingVote
}) {
  const { data: session } = useSession();
  const isLoggedIn = !!session?.user?.email;
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  
  const feedbackServiceApi = new API();

  const handleVote = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isLoggedIn) {
      localStorage.setItem("vote_after_login", _id);
      setShowLoginPopup(true);
    } else {
      setLoadingVote(true);
      await feedbackServiceApi.voteForPost({ feedbackId: _id });
      setLoadingVote(false);
    }
  };
  const handleGoogleLogin = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    await signIn("google");
  };
  return (
    <a
      href=""
      onClick={(e) => {
        e.preventDefault();
        openModal();
      }}
      className="flex gap-8 my-8 items-center"
    >
      <div className="flex-grow">
        <h2 className="font-bold">{title}</h2>
        <p className="text-gray-600 text-sm">{description}</p>
      </div>
      <div>
        {showLoginPopup && (
          <Popup
            title={"Confirm Your Vote?"}
            narrow={true}
            setShow={setShowLoginPopup}
          >
            <div className="p-4">
              <Button primary="true" onClick={handleGoogleLogin}>
                Login with google
              </Button>
            </div>
          </Popup>
        )}
        <button
          onClick={handleVote}
          className="shadow-sm text-gray-600 shadow-gray-200 border rounded-md py-1 px-4 flex items-center gap-1"
        >
          {loadingVote && <Spinner primary={true} />}
          {!loadingVote && (
            <>
              <span className="triangle-vote-up mr-1"></span>
              {vote.length || 0}
            </>
          )}
        </button>
      </div>
    </a>
  );
}
