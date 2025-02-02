import React from 'react'
import {motion} from 'framer-motion'

import Confetti from 'react-confetti'


const CelebrationConfetti = ({feedback,currentQuestion,numberOfQuestions,score,loading}) => {
  
  return (
    <> 
    
    {(feedback === "correct" ||
    (currentQuestion > numberOfQuestions &&
        score >numberOfQuestions / 2)) &&
    !loading && (
        <motion.div
        className="absolute  w-full max-w-md mx-auto mt-11 inset-0  overflow-hidden z-10"
        transition={{ duration: 4 }}
        >
        <Confetti
      width={500}
      height={500}
      initialVelocityY={20}
      
      gravity={0.2}

      numberOfPieces={500}
      recycle={false}
    />
        </motion.div>
    )}
 

    </>
  )
}

export default CelebrationConfetti
