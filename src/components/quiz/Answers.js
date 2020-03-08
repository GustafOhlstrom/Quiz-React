import React from 'react'

function Answers({answer, answerKey, onAnswerChange}) {
    return (
        <div className="answer input-group">
            <div className="input-group-prepend">
                <div className="input-group-text">
                    <input 
                        type="checkbox"
                        name={answerKey}
                        id={answerKey} 
                        onChange={onAnswerChange}
                    />
                </div>
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