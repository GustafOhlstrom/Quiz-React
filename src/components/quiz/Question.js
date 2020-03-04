import React from 'react'
import Answers from './Answers'

function Question(props) {
    const {answers, question, correctAnswer} = props.question
    return (
        <div className="mb-5">
            <label className="question form-control mb-0">{question}</label>
            <div className="answers">
                {answers.map((answer,index) => ( 
                    <Answers 
                        key={index} 
                        answer={answer}
                    />
                ))}
            </div>
        </div>
    )
}

export default Question