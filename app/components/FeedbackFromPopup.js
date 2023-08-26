import { useEffect, useState } from "react";
import Button from "./shared-components/Button";
import Popup from "./shared-components/Popup";
import API from "../services/feedbackService";

import Spinner from "../utils/svg/Spinner";
import Attachemnt from "./shared-components/Attachments";

export default function FeedbackFromPopup({ setShow, onCreate }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [uploads, setUploads] = useState([]);
  const [loading, setLoading] = useState(false);
  const [creatPostLoading, setCreatePostLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const feedbackServiceApi = new API();

  useEffect(() => {
    if (title.trim().length !== 0 && description.trim().length !== 0) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [title, description]);

  const handleCreatePost = async (e) => {
    e.preventDefault();
    setCreatePostLoading(true);
    const res = await feedbackServiceApi.createPost({
      title,
      description,
      uploads,
    });

    if (res.data) {
      setCreatePostLoading(false);
      setShow((prev) => !prev);
      onCreate();
    }
    setCreatePostLoading(false);
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
                <Attachemnt
                  link={link}
                  idx={idx}
                  handleRemoveAttachments={(e, link) =>
                    handleRemoveAttachments(e, link)
                  }
                  showRemoveButton={true}
                />
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

          <Button
            disabled={creatPostLoading || isDisabled}
            primary="true"
            onClick={handleCreatePost}
          >
            {creatPostLoading ? "Creating.." : "Create"}
          </Button>
        </div>
      </form>
    </Popup>
  );
}
