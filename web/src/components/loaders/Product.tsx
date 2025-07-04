export const Product = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div className="font-outfit gap-3 flex flex-col animate-pulse">
        <div className="bg-[#6EC3F64D] h-[134px] relative rounded-lg flex justify-center items-center">
          <div className="w-20 h-20 bg-gray-300 rounded-md" />
        </div>
        <div className="h-5 bg-gray-300 rounded w-3/4" />
        <div className="h-6 bg-gray-300 rounded w-1/2" />
        <div className="h-10 rounded-full bg-gray-400 w-full" />
      </div>
    </div>
  );
};
