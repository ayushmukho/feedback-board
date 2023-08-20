import Close from "../../utils/svg/Close";
import LeftArrow from "../../utils/svg/LeftArrow";

export default function Popup({ setShow, children, title, narrow }) {
  const handleClosePopup = (e) => {
    e.stopPropagation();
    e.preventDefault();

    setShow((prev) => !prev);
  };
  return (
    <div className="fixed inset-0 bg-white md:bg-black md:bg-opacity-80 flex md:items-center">
      <button
        onClick={handleClosePopup}
        className="hidden md:block fixed top-4 right-4 text-white"
      >
        <Close />
      </button>
      <div className="w-full">
        <div
          className={`bg-white ${
            narrow ? "md:max-w-sm" : "md:max-w-2xl"
          } md:mx-auto md:rounded-lg overflow-hidden`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="realtive md:min-h-0 min-h-[40px]">
            <button
              onClick={handleClosePopup}
              className="absolute top-4 left-8 md:hidden"
            >
              <LeftArrow />
            </button>
            {!!title && <h2 className="py-4 text-center border-b">{title}</h2>}
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
