import { useState } from "react";
import Button from "../shared-components/Button";
import Popup from "../shared-components/Popup";
import API from "../services/feedbackService";
import Attach from "../utils/svg/Attach";
import Trash from "../utils/svg/Trash";
import Spinner from "../utils/svg/Spinner";

export default function FeedbackFromPopup({ setShow }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [uploads, setUploads] = useState([]);
  const [loading, setLoading] = useState(false);
  const feedbackServiceApi = new API();

  const handleCreatePost = (e) => {
    e.preventDefault();

    feedbackServiceApi.createPost({ title, description }).then((res) => {
      setShow((prev) => !prev);
    });
  };
  const handleAttachFiles = async (e) => {
    setLoading(true);
    const files = [...e.target.files];
    const data = new FormData();
    for (const file of files) {
      data.append("file", file);
    }
    const res = await feedbackServiceApi.uploadPostFile(data);
    if (res?.data) {
      setUploads((existingUploads) => [...existingUploads, ...res.data]);
      setLoading(false);
    }
    setLoading(false);
  };
  const handleRemoveAttachments = async (e, link) => {
    e.preventDefault();
    const name = link.split("/")[3];
    setUploads((previousUploads) => {
      return previousUploads.filter((val) => val !== link);
    });
    await feedbackServiceApi.deleteFileFromS3({ name });
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
        {uploads?.length > 0 && (
          <div>
            <label className=" block mt-2 mb-1 text-slate-700">
              Attachments
            </label>
            <div className="flex gap-3 mt-3">
              {uploads.map((link, idx) => (
                <a
                  href={link}
                  target="_blank"
                  className="h-16 relative"
                  key={idx}
                >
                  <button
                    onClick={(e) => handleRemoveAttachments(e, link)}
                    className="absolute -right-2 -top-2 bg-red-400 p-1 rounded-md"
                  >
                    <Trash className="h-4 w-4" />
                  </button>
                  {/.(jpg|png)$/.test(link) ? (
                    <img className="h-16 w-auto rounded-md" src={link} alt="" />
                  ) : (
                    <div className="bg-gray-300 h-16 p-2 flex items-center rounded-md">
                      <Attach className="w-4 h-4" />
                      {link.split("/")[3].substring(13)}
                    </div>
                  )}
                </a>
              ))}
            </div>
          </div>
        )}
        <div className="flex gap-2 mt-2 justify-end">
          <label
            className={
              loading
                ? "py-2 px-4 text-gray-300"
                : "text-gray-600 cursor-pointer py-2 px-4"
            }
          >
            {loading ? (
              <div className="flex items-center">
                <Spinner />
                <span>Uploading...</span>
              </div>
            ) : (
              <>
                <span>Attach Files</span>
                <input
                  multiple
                  onChange={handleAttachFiles}
                  type="file"
                  className="hidden"
                />
              </>
            )}
          </label>
          <Button primary="true" onClick={handleCreatePost}>
            Create Post
          </Button>
        </div>
      </form>
    </Popup>
  );
}
