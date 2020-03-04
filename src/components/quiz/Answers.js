import React from 'react'

function Answers({answer, questionKey, onChange}) {
    return (
        <div className="answer input-group">
            <div className="input-group-prepend">
                <div className="input-group-text">
                    <input 
                        type="checkbox"
                        name={answer}
                        id={questionKey+answer} 
                        onChange={onChange}
                    />
                </div>
            </div>
            <label 
                className="form-control"
                htmlFor={questionKey+answer}
            >
                {answer}
            </label>
        </div>
    )
}

export default Answers