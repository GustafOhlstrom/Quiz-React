import React from 'react'
import Answers from './Answers'

function Question(props) {
    const { answers, question, correctAnswers, pointsPerAnswer } = props.question
    const { questionKey, onChange } = props
    const maxPoints = correctAnswers.length * pointsPerAnswer
    return (
        <div className="mb-5">
            <div className="question input-group">
                <label className="form-control mb-0">{question}</label>
                <div className="input-group-append">
                    <span className="input-group-text">{maxPoints}</span>
                </div>
            </div>
            <div className="answers">
                {answers.map((answer,index) => 
                    <Answers 
                        key={index} 
                        questionKey={questionKey}
                        answer={answer}
                        onChange={onChange}
                    />
                )}
            </div>
        </div>
    )
    
}

export default Question