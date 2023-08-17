export default function FeedbackItem({
  openModal,
  title,
  description,
  votesCount,
}) {
  return (
    <a
      href=""
      onClick={(e) => {
        e.preventDefault();
        openModal();
      }}
      className="flex gap-8 my-8 items-center"
    >
      <div className="flex-grow">
        <h2 className="font-bold">{title}</h2>
        <p className="text-gray-600 text-sm">{description}</p>
      </div>
      <div>
        <button className="shadow-sm text-gray-600 shadow-gray-200 border rounded-md py-1 px-4 flex items-center gap-1">
          <span className="triangle-vote-up"></span>
          {votesCount || 0}
        </button>
      </div>
    </a>
  );
}
