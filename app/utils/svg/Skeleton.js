export default function Skeleton() {
  const arry = [1];
  return (
    <>
      {[...Array(6)].map((_, idx) => (
        <div key={idx} role="status" className="w-full animate-pulse mt-8">
          <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
        </div>
      ))}
    </>
  );
}
