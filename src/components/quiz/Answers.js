import React from 'react'

function Answers({answer}) {
    return (
        <div className="answer input-group">
            <div className="input-group-prepend">
                <div className="input-group-text">
                    <input 
                        type="checkbox"
                    />
                </div>
            </div>
            <label 
                className="form-control"
            >
                {answer}
            </label>
        </div>
    )
}

export default Answers