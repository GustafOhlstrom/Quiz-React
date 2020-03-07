import React from 'react'
import CreateAnswer from './CreateAnswer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

function CreateQuestion(props) {
    const {question, answers } = props.question
    const {index, onQuestionChange, onAnswerChange, onCorrectAnswerChange, onNewAnswerClick, onRemoveAnswerClick, onRemoveQuestionClick} = props
    return (
        <div className="input-group mb-4">
            {/* Question */}
            <div className="input-group">
                <div className="input-group-prepend">
                    <div className="input-group-text">
                        <label 
                            className="mb-0"
                            htmlFor={"question" + index} 
                        >
                            Question
                        </label>
                    </div>
                </div>
                <input
                    id={"question" + index}
                    className="form-control"
                    placeholder="Enter question"
                    type="text"
                    name={index}
                    value={question}
                    onChange={onQuestionChange}
                />
                <div className="question-icons input-group-append">
                    <div className="remove-icon input-group-text">
                        <FontAwesomeIcon 
                            icon={faTimes} 
                            onClick={() => onRemoveQuestionClick(index)}
                        />
                    </div>
                    <div className="add-icon input-group-text">
                        <FontAwesomeIcon 
                            icon={faPlus} 
                            onClick={() => onNewAnswerClick(index)}
                        />
                    </div>
                </div>
            </div>
            <small className="form-text text-white ml-auto mb-2">
              Select correct answer(s) with checkbox
            </small>

            {/* Ansewers */}
            {answers.map((answer, answerIndex) => 
                <CreateAnswer 
                    key={question + answerIndex} 
                    question={question}
                    index={answerIndex}
                    answer={answer}
                    onAnswerChange={e => onAnswerChange(e, index)}
                    onCorrectAnswerChange={e => onCorrectAnswerChange(e, answer, index)}
                    onRemoveAnswerClick={e => onRemoveAnswerClick(index, answerIndex, answer)}
                />
            )}
        </div>
    )
}

export default CreateQuestion