import React, { useState } from "react";
import EndSvg from "../assets/end-screen.svg";

const EndScreen = ({ score, leaderboard }) => {
  const [showLeaderboard, setShowLeaderboard] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 to-indigo-600 text-white px-4">
      {!showLeaderboard ? (
        <>
          {/* Score Number */}
          <h1 className="text-8xl sm:text-9xl font-extrabold mb-2 animate-pop">
            {score}
          </h1>

          {/* Label */}
          <p className="text-3xl sm:text-4xl font-semibold mb-8">Your Score</p>

          {/* SVG */}
          <img
            src={EndSvg}
            alt="End Illustration"
            className="w-72 sm:w-96 mb-8 animate-pop"
          />

          {/* View Leaderboard Button */}
          <button
            onClick={() => setShowLeaderboard(true)}
            className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-2xl shadow-lg hover:bg-gray-100 transition"
          >
            View Leaderboard
          </button>
        </>
      ) : (
        <>
          <h2 className="text-3xl font-bold mb-6">Leaderboard</h2>
          <ul className="w-full max-w-md space-y-2">
            {leaderboard
              .sort((a, b) => b.score - a.score)
              .slice(0, 10)
              .map((entry, idx) => (
                <li
                  key={idx}
                  className="flex justify-between bg-white/20 px-4 py-2 rounded-lg"
                >
                  <span>{entry.name}</span>
                  <span>{entry.score}</span>
                </li>
              ))}
          </ul>

          <button
            onClick={() => setShowLeaderboard(false)}
            className="mt-6 bg-white text-blue-600 font-semibold px-6 py-3 rounded-2xl shadow-lg hover:bg-gray-100 transition"
          >
            Back
          </button>
        </>
      )}
    </div>
  );
};

export default EndScreen;
