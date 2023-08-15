import { useState } from "react";
import Button from "../shared-components/Button";
import Popup from "../shared-components/Popup";
import API from "../services/feedbackService";

export default function FeedbackFromPopup({ setShow }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleCreatePost = (e) => {
    e.preventDefault();
    const feedbackServiceApi = new API();
    feedbackServiceApi.createPost({ title, description }).then((res) => {
      setShow((prev) => !prev);
    });
  };
  const handleAttachFiles = async (e) => {
    const feedbackServiceApi = new API();
    const files = [...e.target.files];
    const data = new FormData();
    for (const file of files) {
      data.append("file", file);
    }
    const res = await feedbackServiceApi.uploadPostFile(data);
    console.log(res);
  };
  return (
    <Popup setShow={setShow} title={"Make a suggestion"}>
      <form className="p-8">
        <label className=" block mt-4 mb-1 text-slate-700">Title</label>
        <input
          className="w-full border p-2 rounded-md"
          type="text"
          placeholder="A short, descriptive title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label className=" block mt-4 mb-1 text-slate-700">Details</label>
        <textarea
          className="w-full border p-2 rounded-md"
          placeholder="Please include details"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div className="flex gap-2 mt-2 justify-end">
          <label className="py-2 px-4 text-gray-600 cursor-pointer">
            <span>Attach Files</span>
            <input
              multiple
              onChange={handleAttachFiles}
              type="file"
              className="hidden"
            />
          </label>
          <Button primary="true" onClick={handleCreatePost}>
            Create Post
          </Button>
        </div>
      </form>
    </Popup>
  );
}
