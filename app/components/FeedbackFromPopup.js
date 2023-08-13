import Button from "../shared-components/Button";

export default function FeedbackFromPopup({ setShowFeedbackPopup }) {
  return (
    <div className="fixed inset-0 bg-white md:bg-black md:bg-opacity-80 flex md:items-center">
      <button
        onClick={() => setShowFeedbackPopup((prev) => !prev)}
        className="hidden md:block fixed top-4 right-4 text-white"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
      <div className="w-full">
        <div className="bg-white md:max-w-2xl md:mx-auto md:rounded-lg overflow-hidden text-gray-600">
          <div className="realtive">
            <button
              onClick={() => setShowFeedbackPopup((prev) => !prev)}
              className="absolute top-4 left-8 md:hidden"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                />
              </svg>
            </button>
            <h2 className="py-4 text-center border-b">Make a suggestion</h2>
          </div>

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
        </div>
      </div>
    </div>
  );
}
