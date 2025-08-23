import React from "react";
import HomeScreenSvg from "../assets/home-screen.svg";

const Home = ({ onStart }) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-blue-500 to-indigo-600 text-white px-4">
      {/* SVG Illustration with bounce */}
      <img
        src={HomeScreenSvg}
        alt="Quiz Illustration"
        className="w-64 sm:w-80 mb-8 drop-shadow-lg animate-bounce"
      />

      {/* Title */}
      <h1 className="font-[Poppins] text-5xl sm:text-7xl font-extrabold mb-6 text-center drop-shadow-lg">
        QuizBuzz
      </h1>

      {/* Short & Minimal Description (but back to your original style) */}
      {/* <p className="font-[Inter] text-sm sm:text-base mb-10 text-center max-w-md opacity-90">
        Challenge yourself and see how much you know!
      </p> */}

      {/* Start Button */}
      <button
        onClick={onStart}
        className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-2xl shadow-lg hover:bg-gray-100 active:scale-95 transition"
      >
        Start Quiz
      </button>
    </div>
  );
};

export default Home;
