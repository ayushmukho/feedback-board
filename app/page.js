"use client";

import { useState } from "react";
import FeedbackItem from "./components/FeedbackItem";
import FeedbackFromPopup from "./components/FeedbackFromPopup";

export default function Home() {
  const [showFeedbackPopup, setShowFeedbackPopup] = useState(false);

  const openFeedbackModal = () => {
    setShowFeedbackPopup(prev => !prev)
  };
  return (
    <main className="bg-white md:max-w-2xl mx-auto shadow-lg md:rounded-lg md:mt-8 overflow-hidden">
      <div className="bg-gradient-to-r from-cyan-400 to-blue-400 p-8">
        <h1 className="font-bold text-xl">Coding with Mukho</h1>
        <p className="text-opacity-90 text-slate-700">
          Help me decide what should I build next!!!
        </p>
      </div>
      <div className="bg-gray-100 px-8 py-4 flex border-b">
        <div className="grow"></div>
        <>
          <button
            onClick={openFeedbackModal}
            className="bg-blue-500 py-1 px-4 rounded-md text-white text-opacity-90"
          >
            Make Suggestion
          </button>
        </>
      </div>
      <div className="px-8">
        <FeedbackItem />
        <FeedbackItem />
        <FeedbackItem />
        <FeedbackItem />
      </div>
      {showFeedbackPopup && (
        <FeedbackFromPopup />
      )}
    </main>
  );
}
