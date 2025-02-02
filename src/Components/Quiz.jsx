import { motion } from "framer-motion";
import { useEffect, useState } from "react";

import CelebrationConfetti from "./celebrationConfetti";
import Options from "./Options";

const QuizApp = () => {
const [questions, setQuestions] = useState([])
const [currentQuestion, setCurrentQuestion] = useState(0)
const [score, setScore] = useState(0);
const [loading, setLoading] = useState(true)
const [error, setError] = useState(null)
const [quizStarted, setQuizStarted] = useState(false)
const [direction, setDirection] = useState(1)
const [feedback, setFeedback] = useState(null)
const [selectedOption, setSelectedOption] = useState(null)



useEffect(() => {
fetch("/api")
    .then((response) => response.json())

    .then((res) => {
    setLoading(false);

    setQuestions(res.questions);
    })
    .catch((err) => {
    setError(err.message);
    setLoading(false);
    });
}, [quizStarted])

const handleAnswer = (isCorrect, index) => {
setSelectedOption(index);
questions[currentQuestion].options[index].unanswered = true;
questions[currentQuestion].attempted = true;
setFeedback(isCorrect ? "correct" : "wrong");
isCorrect && setScore(score + 1);
}

const nextQuestion = () => {
setDirection(1);
setCurrentQuestion(currentQuestion + 1);
setFeedback(null);
setSelectedOption(null);
}

const prevQuestion = () => {
if (currentQuestion > 0) {
    setDirection(-1);
    setCurrentQuestion(currentQuestion - 1);
    setFeedback(null);
    setSelectedOption(null);
}
}

const handleRestart = () => {
    setQuizStarted(false);
    setCurrentQuestion(0);
    setScore(0);
    setFeedback(null);
    setSelectedOption(null);
    }

return (
<div className="h-screen flex flex-col items-center justify-center bg-gradient-to-r from-[#148F8C] to-[#2D265D] p-4 text-white relative overflow-hidden">
    {loading && (
    <p className="text-center text-lg font-bold animate-pulse">
        Loading quiz...
    </p>
    )}
    {error && <p className="text-center text-red-500">Error: {error&&'error loading quiz'}</p>}

    <CelebrationConfetti
     feedback={feedback}
     currentQuestion={currentQuestion}
     numberOfQuestions={questions.length-1}
     score={score}
     loading={loading}
    />

    {!quizStarted ? (
    <motion.button
        disabled={loading}
        onClick={() => setQuizStarted(true)}
        className="bg-[#148F8C]  px-6 py-3 rounded-lg text-lg font-semibold hover:bg-[#208886] text-white transition shadow-lg"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
    >
        Start Quiz
    </motion.button>
    ) : (
    <motion.div
        key={currentQuestion}
        initial={{ opacity: 0, x: direction * 100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -direction * 100 }}
        transition={{ duration: 0.5 }}
        className="
        flex flex-col
        justify-evenly
        min-h-[90%]
        w-full max-w-md
        bg-white p-6
        rounded-lg shadow-2xl
        text-black "
    >
        {currentQuestion <= questions.length - 1 && (
        <>
            <motion.div
            className=" h-full   justify-evenly flex-col flex"
            key={currentQuestion}
            initial={{ opacity: 0, x: direction * 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -direction * 100 }}
            transition={{ duration: 0.5 }}
            >
            <h2 className="md:text-xl text-l  font-bold mb-4 text-center text-[#148F8C] m-auto">
                {questions[currentQuestion].description}
            </h2>

            <Options
                questions={questions}
                currentQuestion={currentQuestion}
                selectedOption={selectedOption}
                handleAnswer={handleAnswer}
                feedback={feedback}
                direction={direction}
            />
            </motion.div>
            <p className="mt-4 text-center font-semibold text-lg">
            Score: {score}
            </p>
            <div className="flex z-10 justify-between mt-4">
            <motion.button
                onClick={prevQuestion}
                className="bg-[#148F8C] text-white px-4 py-2 rounded-r-full rounded-l-full shadow-md hover:bg-[#1a6665] transition"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                Previous
            </motion.button>
            {/* number of questions */}
            <div className="text-center m-auto text-gray-500 text-sm">
                Q. {currentQuestion + 1} of {questions.length}
            </div>

            <motion.button
                onClick={nextQuestion}
                className="bg-[#2D265D] text-white px-4 py-2  rounded-r-full rounded-l-full shadow-md hover:bg-[#241e4a] transition"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                {currentQuestion == questions.length - 1 ? "Finish" : "Next"}
            </motion.button>
            </div>
        </>
        )}

        {currentQuestion > questions.length - 1 && (
        <div className="border rounded-md w-full h-full flex flex-col justify-evenly">
            <motion.p
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold mx-auto"
            >
            Quiz complete!
            </motion.p>
            <div
            className={`
                border font-semibold  
                ${
                    score < questions.length / 2
                    ? "bg-red-500"
                    : score == questions.length / 2
                    ? "bg-yellow-400"
                    : "bg-green-500"
                }
                text-white w-56
                h-56  flex mx-auto 
                rounded-full
                `}
            >
            <div className="flex m-auto text-4xl">
                <motion.p
                className="p-0 m-0"
                initial={{ opacity: 0, x: -60 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                >
                {score}
                </motion.p>
                /
                <motion.p
                initial={{ opacity: 0, x: 60 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                >
                {" "}
                {questions.length}
                </motion.p>
            </div>
            </div>
            <button onClick={handleRestart} className="text-gray-700 z-10">
            Start Quiz again?
            </button>
        </div>
        )}
    </motion.div>
    )}
</div>
);
};

export default QuizApp;
