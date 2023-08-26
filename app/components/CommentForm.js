import { useState } from "react";
import AttachFileButton from "./shared-components/AttachFileButton";
import API from "../services/feedbackService";
import COMMENT_API from "../services/commentService";
import Attachemnt from "./shared-components/Attachments";
import Button from "./shared-components/Button";
import Popup from "./shared-components/Popup";
import { signIn, useSession } from "next-auth/react";

export default function CommentForm({ id }) {
  const [commentText, setCommentText] = useState("");
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [uploads, setUploads] = useState([]);
  const feedbackServiceApi = new API();
  const commentServiceApi = new COMMENT_API();

  const { data: session } = useSession();
  const isLoggedIn = !!session?.user?.email;

  const handleRemoveAttachments = async (e, link) => {
    e.preventDefault();
    const name = link.split("/")[3];
    setUploads((previousUploads) => {
      return previousUploads.filter((val) => val !== link);
    });
    await feedbackServiceApi.deleteFileFromS3({ name });
  };

  const handleCommentPost = async (e) => {
    e.preventDefault();
    if (!isLoggedIn) {
      localStorage.setItem("vote_after_login", id);
      setShowLoginPopup(true);
    } else {
      const res = await commentServiceApi.createComment({
        text: commentText,
        uploads: uploads,
      });
      console.log(res.data);
    }
  };

  const handleGoogleLogin = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    await signIn("google");
  };

  return (
    <form>
      <textarea
        className="border rounded-md w-full p-2"
        placeholder="Lem me know what do you think...."
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
      />
      {uploads?.length > 0 && (
        <div>
          <label className=" block mt-2 mb-1 text-slate-700">Attachments</label>
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
      {showLoginPopup && (
        <Popup
          title={"Wanna Comment First Log In!!!"}
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
      <div className="flex justify-end gap-2 mt-2">
        <AttachFileButton setUploads={setUploads} />
        <Button
          onClick={handleCommentPost}
          primary="true"
          disabled={commentText === ""}
        >
          Comment
        </Button>
      </div>
    </form>
  );
}
