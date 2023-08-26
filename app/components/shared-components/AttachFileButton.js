import API from "@/app/services/feedbackService";
import Spinner from "@/app/utils/svg/Spinner";
import { useState } from "react";

export default function AttachFileButton({ setUploads }) {
  const [loading, setLoading] = useState(false);
  const feedbackServiceApi = new API();

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
  return (
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
  );
}
