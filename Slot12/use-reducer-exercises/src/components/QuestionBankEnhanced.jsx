import React, { useReducer, useEffect, useState } from "react";
import { Button, Container, Card, ProgressBar } from "react-bootstrap";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const initialState = {
  questions: [
    {
      id: 1,
      question: "What is the capital of Australia?",
      options: ["Sydney", "Canberra", "Melbourne", "Perth"],
      answer: "Canberra",
    },
    {
      id: 2,
      question: "Which planet is known as the Red Planet?",
      options: ["Venus", "Mars", "Jupiter", "Saturn"],
      answer: "Mars",
    },
    {
      id: 3,
      question: "What is the largest ocean on Earth?",
      options: [
        "Atlantic Ocean",
        "Indian Ocean",
        "Pacific Ocean",
        "Arctic Ocean",
      ],
      answer: "Pacific Ocean",
    },
  ],
  currentQuestion: 0,
  selectedOption: "",
  score: 0,
  showScore: false,
  feedback: "",
  highScore: localStorage.getItem("highScore") || 0,
};

function quizReducer(state, action) {
  switch (action.type) {
    case "SELECT_OPTION":
      const correct =
        action.payload === state.questions[state.currentQuestion].answer;
      return {
        ...state,
        selectedOption: action.payload,
        feedback: correct
          ? "✅ Correct! 🎉"
          : `❌ Incorrect! The correct answer is: ${state.questions[state.currentQuestion].answer}`,
      };

    case "NEXT_QUESTION":
      const isCorrect =
        state.selectedOption === state.questions[state.currentQuestion].answer;
      const newScore = isCorrect ? state.score + 1 : state.score;
      const nextIndex = state.currentQuestion + 1;
      const isFinished = nextIndex === state.questions.length;

      if (isFinished) {
        const best = Math.max(newScore, state.highScore);
        localStorage.setItem("highScore", best);
      }

      return {
        ...state,
        score: newScore,
        currentQuestion: nextIndex,
        selectedOption: "",
        showScore: isFinished,
        feedback: "",
        highScore: localStorage.getItem("highScore") || newScore,
      };

    case "RESTART_QUIZ":
      return { ...initialState, highScore: state.highScore };

    default:
      return state;
  }
}

function QuestionBankEnhanced() {
  const [state, dispatch] = useReducer(quizReducer, initialState);
  const { questions, currentQuestion, selectedOption, score, showScore, feedback, highScore } = state;
  const [timeLeft, setTimeLeft] = useState(10);

  // Countdown timer
  useEffect(() => {
    if (showScore) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev === 1) {
          dispatch({ type: "NEXT_QUESTION" });
          return 10;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [currentQuestion, showScore]);

  const handleOptionSelect = (option) => {
    dispatch({ type: "SELECT_OPTION", payload: option });
  };

  const handleNextQuestion = () => {
    setTimeLeft(10);
    dispatch({ type: "NEXT_QUESTION" });
  };

  const handleRestartQuiz = () => {
    setTimeLeft(10);
    dispatch({ type: "RESTART_QUIZ" });
  };

  return (
    <Container className="mt-4">
      <Card className="p-4 shadow-sm">
        {showScore ? (
          <div className="text-center">
            <h2>
              🎯 Your Score: {score} / {questions.length}
            </h2>
            <h4>🏆 High Score: {highScore}</h4>
            <Button variant="primary" onClick={handleRestartQuiz}>
              Restart Quiz
            </Button>
          </div>
        ) : (
          <div>
            <h5 className="text-end text-secondary">
              Question {currentQuestion + 1}/{questions.length}
            </h5>
            <h4>{questions[currentQuestion].question}</h4>

            {/* Countdown */}
            <div className="mb-3">
              <span
                style={{
                  color: timeLeft <= 5 ? "red" : "black",
                  fontWeight: "bold",
                }}
              >
                ⏰ Time left: {timeLeft}s
              </span>
            </div>

            <div className="mt-2">
              {questions[currentQuestion].options.map((option, i) => (
                <Button
                  key={i}
                  variant={
                    selectedOption === option
                      ? "success"
                      : "outline-secondary"
                  }
                  className="m-2"
                  onClick={() => handleOptionSelect(option)}
                  disabled={!!feedback}
                >
                  {option}
                </Button>
              ))}
            </div>

            {feedback && (
              <div className="mt-3">
                {feedback.includes("Correct") ? (
                  <FaCheckCircle color="green" size={20} />
                ) : (
                  <FaTimesCircle color="red" size={20} />
                )}{" "}
                {feedback}
              </div>
            )}

            <Button
              variant="primary"
              className="mt-3"
              disabled={!selectedOption && !feedback}
              onClick={handleNextQuestion}
            >
              {currentQuestion === questions.length - 1
                ? "Finish Quiz"
                : "Next Question"}
            </Button>

            <ProgressBar
              now={((currentQuestion + 1) / questions.length) * 100}
              className="mt-3"
            />
          </div>
        )}
      </Card>
    </Container>
  );
}

export default QuestionBankEnhanced;
