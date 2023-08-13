import Button from "../shared-components/Button";
import Popup from "../shared-components/Popup";

export default function FeedbackFromPopup({ setShow }) {
  return (
    <Popup
      setShow={setShow}
      title={"Make a suggestion"}
    >
      <form className="p-8">
        <label className=" block mt-4 mb-1 text-slate-700">Title</label>
        <input
          className="w-full border p-2 rounded-md"
          type="text"
          placeholder="A short, descriptive title"
        />
        <label className=" block mt-4 mb-1 text-slate-700">Details</label>
        <textarea
          className="w-full border p-2 rounded-md"
          placeholder="Please include details"
        ></textarea>
        <div className="flex gap-2 mt-2 justify-end">
          <Button>Attach Files</Button>
          <Button primary>Create Post</Button>
        </div>
      </form>
    </Popup>
  );
}
