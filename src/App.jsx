import React, { useState, useEffect } from "react";
import Home from "./components/Home";
import Quiz from "./components/Quiz";
import EndScreen from "./components/EndScreen";

// GitHub Gist config
const GIST_ID = import.meta.env.VITE_GIST_ID; // Your gist ID
const GIST_FILE = "scores.json"; // File inside gist
const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN; // Personal access token

function App() {
  const [quizStarted, setQuizStarted] = useState(false);
  const [finalScore, setFinalScore] = useState(null);
  const [leaderboard, setLeaderboard] = useState([]);

  // Fetch leaderboard from gist
  const fetchLeaderboard = async () => {
    try {
      const response = await fetch(
        `https://api.github.com/gists/${GIST_ID}`,
        {
          headers: {
            Authorization: `token ${GITHUB_TOKEN}`,
          },
        }
      );
      const data = await response.json();
      const fileContent = data.files[GIST_FILE]?.content;
      if (fileContent) {
        setLeaderboard(JSON.parse(fileContent));
      }
    } catch (error) {
      console.error("Error fetching leaderboard:", error);
    }
  };

  // Update leaderboard in gist
  const updateLeaderboard = async (newScore) => {
    try {
      const updated = [...leaderboard, newScore];
      await fetch(`https://api.github.com/gists/${GIST_ID}`, {
        method: "PATCH",
        headers: {
          Authorization: `token ${GITHUB_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          files: {
            [GIST_FILE]: {
              content: JSON.stringify(updated, null, 2),
            },
          },
        }),
      });
      setLeaderboard(updated);
    } catch (error) {
      console.error("Error updating leaderboard:", error);
    }
  };

  // On quiz finish
  const handleFinish = async (score) => {
    setFinalScore(score);

    const playerName = prompt("Enter your name for the leaderboard:");
    if (playerName) {
      const newEntry = { name: playerName, score };
      await updateLeaderboard(newEntry);
    }
  };

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  if (finalScore !== null) {
    return (
      <EndScreen
        score={finalScore}
        leaderboard={leaderboard}
        onRestart={() => {
          setQuizStarted(false);
          setFinalScore(null);
        }}
      />
    );
  }

  return quizStarted ? (
    <Quiz onFinish={handleFinish} />
  ) : (
    <Home onStart={() => setQuizStarted(true)} />
  );
}

export default App;
