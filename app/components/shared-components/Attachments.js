import Attach from "@/app/utils/svg/Attach";
import Trash from "@/app/utils/svg/Trash";

export default function Attachemnt({
  link,
  idx,
  showRemoveButton = false,
  handleRemoveAttachments,
}) {
  return (
    <a href={link} target="_blank" className="h-16 relative" key={idx}>
      {showRemoveButton && (
        <button
          onClick={(e) => handleRemoveAttachments(e, link)}
          className="absolute -right-2 -top-2 bg-red-400 p-1 rounded-md"
        >
          <Trash className="h-4 w-4" />
        </button>
      )}
      {/.(jpg|png)$/.test(link) ? (
        <img className="h-16 w-auto rounded-md" src={link} alt="" />
      ) : (
        <div className="bg-gray-300 h-16 p-2 flex items-center rounded-md">
          <Attach className="w-4 h-4" />
          {link.split("/")[3].substring(13)}
        </div>
      )}
    </a>
  );
}
