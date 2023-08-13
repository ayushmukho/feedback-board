"use client";

import { useState } from "react";
import FeedbackItem from "./components/FeedbackItem";
import FeedbackFromPopup from "./components/FeedbackFromPopup";
import Button from "./shared-components/Button";
import FeedbackItemPopup from "./components/FeedbackItemPopup";

export default function Home() {
  const [showFeedbackPopupFrom, setShowFeedbackPopupForm] = useState(false);
  const [showFeedbackPopupItem, setShowFeedbackPopupItem] = useState(null);

  const openFeedbackModalForm = () => {
    setShowFeedbackPopupForm((prev) => !prev);
  };
  const openFeedbackModalItem = (feedback) => {
    setShowFeedbackPopupItem(feedback);
  };

  const feedback = [
    {
      title: "Improve your code quality",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
      votesCount: 80,
    },
    {
      title: "Improve your code quality2",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
      votesCount: 10,
    },
    {
      title: "Improve your code quality3",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
      votesCount: 1,
    },
  ];

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
          <Button primary onClick={openFeedbackModalForm}>
            Make Suggestion
          </Button>
        </>
      </div>
      <div className="px-8">
        {feedback.map((feedback) => (
          <FeedbackItem
            {...feedback}
            openModal={() => openFeedbackModalItem(feedback)}
          />
        ))}
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
