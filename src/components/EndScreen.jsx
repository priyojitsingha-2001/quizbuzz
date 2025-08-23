import React from "react";
import EndSvg from "../assets/end-screen.svg";

const EndScreen = ({ score, onRestart }) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-blue-500 to-indigo-600 text-white px-4">
      
      {/* Score Number */}
      <h1 className="text-8xl sm:text-9xl font-extrabold mb-2 animate-pop">
        {score}
      </h1>

      {/* Label */}
      <p className="text-3xl sm:text-4xl font-semibold mb-8">
        Your Score
      </p>

      {/* SVG */}
      <img
        src={EndSvg}
        alt="End Illustration"
        className="w-72 sm:w-96 mb-8 animate-pop"
      />

      {/* Restart Button */}
      <button
        onClick={onRestart}
        className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-2xl shadow-lg hover:bg-gray-100 transition"
      >
        Restart Quiz
      </button>
    </div>
  );
};

export default EndScreen;
