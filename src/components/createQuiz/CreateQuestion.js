import React from 'react'
import CreateAnswer from './CreateAnswer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

function CreateQuestion(props) {
    const { question, answers, pointsPerAnswer} = props.question
    const {
        questionKey, 
        onQuestionChange, 
        onAnswerChange, 
        onPointsChange,
        onCorrectAnswerChange, 
        onNewAnswerClick, 
        onRemoveAnswerClick, 
        onRemoveQuestionClick
    } = props
    
    return (
        <div className="input-group mb-5">
            {/* Question */}
            <div className="input-group mb-2">
                <div className="input-group-prepend">
                    <div className="input-group-text">
                        <label 
                            className="mb-0"
                            htmlFor={questionKey} 
                        >
                            Question
                        </label>
                    </div>
                </div>
                <input
                    id={questionKey}
                    className="form-control"
                    placeholder="Enter question"
                    type="text"
                    value={question}
                    onChange={onQuestionChange}
                />
                <div className="question-icons input-group-append">
                    <div className="remove-icon input-group-text">
                        <FontAwesomeIcon 
                            icon={faTimes} 
                            onClick={onRemoveQuestionClick}
                        />
                    </div>
                    <div className="add-icon input-group-text">
                        <FontAwesomeIcon 
                            icon={faPlus} 
                            onClick={onNewAnswerClick}
                        />
                    </div>
                </div>
            </div>
            {/* Points per answer */}
            <div className="answerPoints input-group">
                <div className="input-group-prepend">
                    <div className="input-group-text">
                        <label 
                            className="mb-0"
                            htmlFor={"P" + questionKey} 
                        >
                            Points per correct answer
                        </label>
                    </div>
                </div>
                <input
                    id={"P" + questionKey}
                    className="form-control"
                    placeholder="Enter question"
                    type="number"
                    value={pointsPerAnswer}
                    onChange={onPointsChange}
                />
            </div>
            <small className="form-text text-white ml-auto mb-2">
              Select correct answer(s) with checkbox
            </small>

            {/* Ansewers */}
            {Object.keys(answers).map(answerKey => { 
                return (
                    <CreateAnswer 
                        key={answerKey} 
                        answerKey={answerKey}
                        answer={answers[answerKey]}

                        onAnswerChange={(e, answerChecked) => onAnswerChange(e, answerChecked, answerKey)}
                        onCorrectAnswerChange={e => onCorrectAnswerChange(e, answers[answerKey], answerKey)}
                        onRemoveAnswerClick={() => onRemoveAnswerClick(answerKey)}
                    />
                )
            })}
        </div>
    )
}

export default CreateQuestion