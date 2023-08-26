import { useState } from "react";
import Button from "./shared-components/Button";
import Avatar from "./shared-components/Avatar";
import CommentForm from "./CommentForm";

export default function FeedbackItemPopupComments({ id }) {
  return (
    <div className="p-8">
      <div className="flex gap-4 mb-8">
        <Avatar />
        <div>
          <p className="text-gray-600">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book
          </p>
          <div className="text-gray-400 mt-2 text-sm">
            Anonymous &middot; a few seconds ago
          </div>
        </div>
      </div>
      <CommentForm id={id} />
    </div>
  );
}
