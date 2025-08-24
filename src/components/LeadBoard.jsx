import React, { useEffect, useState } from "react";

const GIST_ID = import.meta.env.VITE_GIST_ID;
const FILE_NAME = import.meta.env.VITE_GIST_FILENAME;
const TOKEN = import.meta.env.VITE_GITHUB_TOKEN;
const GIST_URL = `https://api.github.com/gists/${GIST_ID}`;

export default function Leaderboard({ onBack }) {
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchScores = async () => {
    const response = await fetch(GIST_URL, {
      headers: { Authorization: `token ${TOKEN}` },
    });
    const data = await response.json();
    const parsed = JSON.parse(data.files[FILE_NAME].content);

    // sort scores high → low
    parsed.sort((a, b) => b.score - a.score);

    // keep only highest score per name
    const unique = [];
    const seen = new Map();
    for (const p of parsed) {
      if (!seen.has(p.name)) {
        seen.set(p.name, true);
        unique.push(p);
      }
    }

    setScores(unique);
    setLoading(false);
  };

  useEffect(() => {
    fetchScores();
  }, []);

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-blue-500 to-indigo-600 text-white">
        <p className="animate-pulse">Loading leaderboard...</p>
      </div>
    );

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-blue-500 to-indigo-600 text-white px-4">
      <h2 className="text-4xl font-bold mb-6">Leaderboard</h2>
      <ol className="bg-white/20 backdrop-blur-md rounded-xl p-6 space-y-2 w-full max-w-md">
        {scores.map((p, i) => (
          <li
            key={i}
            className="text-lg flex justify-between items-center"
          >
            <span>
              {i + 1}. {p.name}
            </span>
            <span>{p.score}</span>
          </li>
        ))}
      </ol>
      <button
        onClick={onBack}
        className="mt-6 bg-white text-blue-600 font-semibold px-6 py-3 rounded-2xl shadow-lg hover:bg-gray-100 transition"
      >
        Back
      </button>
    </div>
  );
}
