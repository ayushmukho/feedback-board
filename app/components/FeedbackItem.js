export default function FeedbackItem() {
  return (
    <div className="flex gap-8 my-8 items-center">
      <div>
        <h2 className="font-bold">Improve your code quality</h2>
        <p className="text-gray-600 text-sm">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book.
        </p>
      </div>
      <div>
        <button className="shadow-sm text-gray-600 shadow-gray-200 border rounded-md py-1 px-4 flex items-center gap-1">
          <span className="triangle-vote-up"></span>
          80
        </button>
      </div>
    </div>
  );
}
