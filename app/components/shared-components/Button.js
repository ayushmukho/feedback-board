export default function Button(props) {
  return (
    <button
      {...props}
      disabled={props.disabled}
      className={`${
        props.primary === "true" ? "text-white bg-blue-500" : ""
      } flex items-center gap-2 py-1 px-4 rounded-md text-opacity-90 ${
        props.disabled && "text-opacity-70 bg-opacity-70 cursor-not-allowed"
      }`}
    />
  );
}
