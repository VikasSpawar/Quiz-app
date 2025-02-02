import React from 'react'
import {motion} from 'framer-motion'
const Options = ({questions,currentQuestion,feedback,selectedOption , direction , handleAnswer}) => {
  return (
    <div className="space-y-2  my-auto flex flex-col ">
    {questions[currentQuestion].options.map((option, index) => (
    <motion.button
        key={index}
        disabled={
        feedback || questions[currentQuestion].attempted
        }
        onClick={() => handleAnswer(option.is_correct, index)}
        className={`
            text-sm md:text-base
            w-full py-2 px-4
            rounded-lg transition 
            shadow-sm text-gray-800
            bg-gray-200 hover:bg-gray-300
            ${
                questions[currentQuestion].attempted
                ? option.is_correct
                    ? "bg-green-500 hover:bg-green-600"
                    : option?.unanswered && "bg-red-600 hover:bg-red-600"
                : "bg-gray-200 hover:bg-gray-300"
            }
            `}
        whileHover={{ scale: 1.0 }}
        whileTap={{ scale: 0.9 }}
        initial={{ x: direction * 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.1 }}
        {...(selectedOption === index &&
        feedback === "wrong" && {
            animate: { x: [0, -30, 30, -30, 30, 0] },
            transition: { duration: 0.4 },
        })}
    >
        {option.description}
    </motion.button>
    ))}
</div>
  )
}

export default Options
