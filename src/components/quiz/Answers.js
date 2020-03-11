import React from 'react'

function Answers({answer, answerKey, onAnswerChange}) {
    return (
        <div className="answer input-group d-flex flex-row align-items-center">
            <div className="custom-control custom-checkbox">
                <input 
                    className="custom-control-input"
                    id={answerKey} 
                    name={answerKey}
                    type="checkbox" 
                    onChange={onAnswerChange}
                />
                <label 
                    className="custom-control-label" 
                    htmlFor={answerKey}
                />
            </div>
            <label 
                className="form-control" 
                htmlFor={answerKey}
                >
                    {answer}
            </label>
        </div>
    )
}

export default Answers