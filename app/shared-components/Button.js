export default function Button(props) {
  return (
    <button
      {...props}
      className={`${
        props.primary ? "text-white bg-blue-500" : ""
      } py-1 px-4 rounded-md text-opacity-90`}
    />
  );
}
