import React from 'react'
import Answers from './Answers'

function Question(props) {
    const { answers, question, correctAnswers, pointsPerAnswer, displayOrder } = props.question
    const { onAnswerChange } = props
    const maxPoints = Object.keys(correctAnswers).length * pointsPerAnswer
    return (
        <div className="question-container mb-5">
            <div className="question input-group">
                <div className="input-group-append ">
                    <span className="center-fix input-group-text ">{maxPoints}</span>
                </div>
                <label className="form-control mb-0">{question}</label>
                <div className="input-group-append">
                    <span className="input-group-text">{maxPoints}</span>
                </div>
            </div>
            <div className="answers">
                {displayOrder.map(answerKey => 
                    <Answers 
                        key={answerKey} 
                        answerKey={answerKey}
                        answer={answers[answerKey]}
                        onAnswerChange={onAnswerChange}
                    />
                )}
            </div>
        </div>
    )
}

export default Question