import React, { useState, useEffect } from "react";

const Quiz = ({ onFinish }) => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentQn, setCurrentQn] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [showHint, setShowHint] = useState(true);

  const dataUrl = 
    "https://gist.githubusercontent.com/yamauchidotdev/5614ae15eafc13862cc69c4f8a232df0/raw/bea6bd8f7507aedf33d69a7d6ca4766d156ca51f/gistfile1.txt";

  useEffect(() => {
    fetch(dataUrl)
      .then((res) => res.json())
      .then((data) => {
        setQuestions(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch quiz data:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 to-indigo-600 text-white">
        <p className="text-lg animate-pulse">Loading quiz...</p>
      </div>
    );
  }

  if (!questions.length) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 to-indigo-600 text-white">
        <p className="text-lg">No quiz data found.</p>
      </div>
    );
  }

  const currentQuestion = questions[currentQn];
  const progress = ((currentQn + 1) / questions.length) * 100;

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setShowAnswer(true);
    if (option === currentQuestion.answer) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentQn + 1 < questions.length) {
      setCurrentQn(currentQn + 1);
      setSelectedOption(null);
      setShowAnswer(false);
    } else {
      onFinish(score);
    }
  };

  const handleDoubleClick = () => {
    setDarkMode((prev) => !prev);
    if (!darkMode && showHint) {
      setShowHint(false);
    }
  };

  return (
    <div
      onDoubleClick={handleDoubleClick}
      className={`flex flex-col items-center justify-center min-h-screen px-4 py-8 transition-colors duration-500 ${
        darkMode
          ? "bg-gray-900 text-gray-100"
          : "bg-gradient-to-br from-blue-500 to-indigo-600 text-white"
      }`}
    >
      {/* Progress Bar */}
      <div className="w-full max-w-xl mb-6">
        <div className={`w-full rounded-full h-3 ${darkMode ? "bg-gray-700" : "bg-white/30"}`}>
          <div
            className="bg-white h-3 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className={`text-sm mt-2 text-center ${darkMode ? "text-gray-400" : "text-white/80"}`}>
          Question {currentQn + 1} of {questions.length}
        </p>
      </div>

      {/* Question Card */}
      <div className={`relative w-full max-w-xl p-6 rounded-2xl shadow-lg ${darkMode ? "bg-gray-800" : "bg-white/20 backdrop-blur-md"}`}>
        <h2 className="text-lg sm:text-2xl font-bold mb-6 text-center">
          {currentQuestion.question}
        </h2>

        {/* Options */}
        <div className="flex flex-col gap-3">
          {currentQuestion.options.map((option, idx) => {
            const isCorrect = option === currentQuestion.answer;
            const isSelected = option === selectedOption;

            const baseClasses =
              "relative px-4 py-3 rounded-xl border text-left font-medium transition-all duration-300 ease-out transform hover:scale-[1.03] active:scale-95 hover:shadow-md";

            let themeClasses = darkMode
              ? "bg-gray-700 text-gray-200 border-gray-600 hover:bg-blue-600"
              : "bg-white/40 text-white border-white/60 hover:bg-white/70";

            if (showAnswer) {
              if (isCorrect) themeClasses = "bg-green-500 text-white border-green-600 animate-pulse";
              else if (isSelected) themeClasses = "bg-red-500 text-white border-red-600";
            }

            return (
              <button
                key={idx}
                onClick={() => handleOptionClick(option)}
                disabled={showAnswer}
                className={`${baseClasses} ${themeClasses}`}
              >
                {option}
              </button>
            );
          })}
        </div>

        {/* Next Button */}
        {showAnswer && (
          <div className="flex justify-center">
            <button
              onClick={handleNext}
              className={`mt-6 px-6 py-3 font-semibold rounded-xl shadow transition-all duration-300 transform hover:scale-105 active:scale-95 animate-bounce ${
                darkMode ? "bg-blue-500 hover:bg-blue-600 text-white" : "bg-white text-blue-600 hover:bg-white/90"
              }`}
            >
              {currentQn + 1 < questions.length ? "Next Question" : "Finish Quiz"}
            </button>
          </div>
        )}

        {/* Hint Text */}
        {showHint && !darkMode && (
          <p className="mt-6 text-sm text-center text-yellow-300 animate-bounce">
            💡 Double tap anywhere to toggle dark mode
          </p>
        )}
      </div>
    </div>
  );
};

export default Quiz;
