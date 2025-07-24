const Loading = () => {
  return (
    <div className="h-screen w-full space-x-5 flex justify-center items-center bg-white">
      <span className="w-8 h-8 border-4 border-t-transparent border-[#000054E5] rounded-full animate-spin text-white"></span>
      <span className="font-pjs text-[#000054E5] text-3xl">Loading...</span>
    </div>
  );
};

export default Loading;
