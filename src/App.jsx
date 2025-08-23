import React, { useState } from "react";
import Home from "./components/Home";
import Quiz from "./components/Quiz";
import EndScreen from "./components/EndScreen";

function App() {
  const [quizStarted, setQuizStarted] = useState(false);
  const [finalScore, setFinalScore] = useState(null);

  // Handle quiz finish
  const handleFinish = (score) => {
    setFinalScore(score);
  };

  if (finalScore !== null) {
    return (
      <EndScreen
        score={finalScore}
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
