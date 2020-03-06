import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

function CreateAnswer({question, answer, index, onAnswerChange, onCorrectAnswerChange, onRemoveAnswerClick}) {
    return (
        // Answer
        <div className="d-flex align-items-center mb-2 w-100">
            <div className="custom-control custom-checkbox ml-3">
                <input 
                    id={"correctAnswer" + question + index}
                    className="custom-control-input"
                    type="checkbox" 
                    onChange={onCorrectAnswerChange}
                />
                <label 
                    className="custom-control-label" 
                    htmlFor={"correctAnswer"  + question + index}
                ></label>
            </div>
            <div className="input-group">
                <div className="input-group-prepend">
                    <div className="input-group-text">
                        <label 
                            className="mb-0"
                            htmlFor="title" 
                        >
                            Answer
                        </label>
                    </div>
                </div>
                <input
                    id="title"
                    className="form-control"
                    placeholder="Enter a answer"
                    type="text"
                    name={index}
                    value={answer}
                    onChange={onAnswerChange}
                />
                <div className="input-group-append">
                    <div className="remove-icon input-group-text">
                        <FontAwesomeIcon 
                            icon={faTimes} 
                            onClick={onRemoveAnswerClick}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateAnswer