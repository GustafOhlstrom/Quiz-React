import React, { Component } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTimes } from "@fortawesome/free-solid-svg-icons"

class CreateAnswer extends Component {
    state = {
        answerChecked: false
    }

    handleChange = e => {
        this.setState(
            { answerChecked: e.target.checked },
            this.props.onCorrectAnswerChange(e)
        )
    }

    render() {
        const {
            answerKey,
            answer,
            onAnswerChange,
            onRemoveAnswerClick
        } = this.props

        return (
            // Answer
            <div className="d-flex align-items-center mb-2 w-100">
                <div className="custom-control custom-checkbox">
                    <input 
                        id={"C" + answerKey}
                        className="custom-control-input"
                        type="checkbox" 
                        value={this.state.answerChecked}
                        onChange={this.handleChange}
                    />
                    <label 
                        className="custom-control-label" 
                        htmlFor={"C" + answerKey}
                    ></label>
                </div>
                <div className="input-group">
                    <div className="input-group-prepend">
                        <div className="input-group-text">
                            <label 
                                className="mb-0"
                                htmlFor={answerKey}
                            >
                                Answer
                            </label>
                        </div>
                    </div>
                    <input
                        id={answerKey}
                        className="form-control"
                        placeholder="Enter a answer"
                        type="text"
                        value={answer}
                        onChange={e => onAnswerChange(e, this.state.answerChecked)}
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
}

export default CreateAnswer
