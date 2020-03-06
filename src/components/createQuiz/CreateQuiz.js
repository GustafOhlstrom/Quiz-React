import 'bootstrap/dist/css/bootstrap.css';
import './createQuiz.scss'
import React, { Component } from 'react'
import CreateQuestion from './CreateQuestion'

class CreateQuiz extends Component {
    state = {
        title: "",
        questions: [
        ],
    }

    handleTitleChange = e => this.setState({ title: e.target.value})
    
    handleQuestionChange = e => {
        // name stores question index
        const { name, value } = e.target
        this.setState(state =>  {
            let questions = [...state.questions]
            questions[name].question = value
            return { questions: questions }
        })
    }

    handleAnswerChange = (e, questionIndex) => {
        // name stores answer index
        const { name, value } = e.target
        this.setState(state =>  {
            let questions = [...state.questions]
            questions[questionIndex].answers[name] = value
            return { questions: questions }
        })
    }

    handleCorrectAnswerChange = (e, answer, questionIndex) => {
        const { checked } = e.target
        if(checked) {
            // Add the checked answer to the correctAnswers array
            this.setState(state =>  {
                let questions = [...state.questions]
                questions[questionIndex].correctAnswers.push(answer)
                return { questions: questions }
            })
        } else {
            // Remove the checked answer to the correctAnswers array
            this.setState(state =>  {
                let questions = [...state.questions]
                questions[questionIndex].correctAnswers = questions[questionIndex].correctAnswers.filter(item => item !== answer)
                return { questions: questions }
            })
        }
    }

    handleNewAnswerClick = questionIndex => {
        this.setState(state =>  {
            let questions = [...state.questions]
            questions[questionIndex].answers.push("")
            return { questions: questions }
        })
    }

    handleRemoveAnswerClick = (questionIndex, answerIndex) => {
        // Check if more than two answers exists
        if(this.state.questions[questionIndex].answers.length > 2) {
            console.log("More than two answers exists, go ahead and remove")
            this.setState(state =>  {
                let questions = [...state.questions]
                questions[questionIndex].answers.splice(answerIndex, 1);
                return { questions: questions }
            })
        } else {
            alert("Each question need to contain more than two answers")
        }
    }

    handleNewQuestionClick = e => {
        this.setState(state =>  {
            let questions = [...state.questions]
            questions.push(
                {
                    question: "",
                    answers: [
                        "",
                        ""
                    ],
                    correctAnswers: [],
                    pointsPerAnswer: 1,
    
                },
            )
            return { questions: questions }
        })
    }

    handleSubmit = e => {
        e.preventDefault();
        console.log("Submited:", this.state.title)
    }

    render() {
        const { title, questions } = this.state
        return (
        <div id="createQuiz">
            <h1 className="text-center mb-5">Create a Quiz</h1>
            <form onSubmit={this.handleSubmit} className="container mb-5">

                {/* Quiz Title */}
                <div className="input-group mb-5">
                    <div className="input-group mb-2">
                        <div className="input-group-prepend">
                            <div className="input-group-text">
                                <label 
                                    className="mb-0"
                                    htmlFor="title" 
                                >
                                    Quiz Title
                                </label>
                            </div>
                        </div>
                        <input
                            id="title"
                            className="form-control"
                            placeholder="Enter quiz title"
                            type="text"
                            value={title}
                            onChange={this.handleTitleChange}
                        />
                    </div>
                </div>

                {questions.map((question, index) => 
                    <CreateQuestion 
                        key={index} 
                        question={question} 
                        index={index}
                        onQuestionChange={this.handleQuestionChange}
                        onNewAnswerClick={index => this.handleNewAnswerClick(index)}
                        onAnswerChange={(e, index) => this.handleAnswerChange(e, index)}
                        onCorrectAnswerChange={(e, answer, index) => this.handleCorrectAnswerChange(e, answer, index)}
                        onRemoveAnswerClick={(index, answerIndex) => this.handleRemoveAnswerClick(index, answerIndex)}
                    />
                )}

                {/* New Question Button */}
                <div className="form-group">
                    <button 
                        className="btn btn-light d-block ml-auto"
                        type="button" 
                        onClick={this.handleNewQuestionClick}
                    >
                        Add Question
                    </button>
                </div>

                {/* From Submit Button */}
                <div className="form-group">
                    <button 
                        className="btn btn-light d-block mx-auto mt-5"
                        type="submit" 
                    >
                        Submit Quiz
                    </button>
                </div>

            </form>
        </div>    
        )
    }
}

export default CreateQuiz