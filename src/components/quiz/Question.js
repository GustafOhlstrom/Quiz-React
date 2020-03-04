import React from 'react'
import Answers from './Answers'

function Question(props) {
    const { answers, question } = props.question
    const { questionKey, onChange } = props
    return (
        <div className="mb-5">
            <label className="question form-control mb-0">{question}</label>
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