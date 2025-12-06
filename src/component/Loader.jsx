import React from "react";

const Loader = ({ loaded }) => {
  if (loaded) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center transition-opacity duration-500"
      id="preloader"
    >
      {/* CSS Loader Recreation using Tailwind */}
      <div className="relative w-[150px] h-[150px] sm:w-[300px] sm:h-[300px]">
        <div
          className="absolute inset-0 rounded-full border-[5px] border-transparent border-t-accent animate-spin"
          style={{ animationDuration: "2s" }}
        ></div>
        <div
          className="absolute inset-[5px] rounded-full border-[4px] border-transparent border-t-accent animate-spin"
          style={{ animationDuration: "3s" }}
        ></div>
        <div
          className="absolute inset-[15px] rounded-full border-[3px] border-transparent border-t-accent animate-spin"
          style={{ animationDuration: "1.5s" }}
        ></div>

        <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-accent font-bold text-xl sm:text-2xl">
          LOADING
        </p>
      </div>
      <p className="mt-8 text-accent text-sm sm:text-base">
        Please wait while the model is loading...
      </p>
    </div>
  );
};

export default Loader;
