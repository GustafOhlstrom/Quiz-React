import 'bootstrap/dist/css/bootstrap.css';
import './quiz.scss'
import React, { Component } from 'react'
import db from '../../config/fbConfig'
import Question from './Question'

class Quiz extends Component {
    state = {
        id: "",
        questions: [],
        title: "",
        userAnswers: {
            
        },
        missingAnswerMsg: "",
        score: 0,
        maxScore: 2,
        submited: false,
    }

    componentDidMount = () => {
        // Get key from router
        // this.props.match.params.quiz_id
        db.collection('quizes').doc('LMJT8GjDyaswmAv2CxFq').get()
            .then(snapshot => {
                // Create emtpy userAnswers object using the index as key
                const baseUserAnswers = {}
                snapshot.data().questions.forEach((question,index) => baseUserAnswers[index] = [])

                this.setState({
                    ...snapshot.data(), 
                    id: snapshot.id,
                    userAnswers: baseUserAnswers
                })
            })
            .catch(err => console.log(err))
    }

    handleChange = (questionKey, e) => {
        const { name, checked } = e.target
        if(checked) {
            // Add users answer to that questions answer array
            this.setState(state => {
                let newUserAnswers = { ...state.userAnswers }
                newUserAnswers[questionKey] = newUserAnswers[questionKey].concat(name)
                return { userAnswers: newUserAnswers }
            })
        } else {
            // Remove users answer from that questions answer array
            this.setState(state => {
                let newUserAnswers = { ...state.userAnswers }
                newUserAnswers[questionKey] = newUserAnswers[questionKey].filter(answer => answer !== name)
                return { userAnswers: newUserAnswers }
            })
        }
    }

    handleSubmit = e => {
        e.preventDefault()
        const { userAnswers, questions } = this.state

        // Stop form interactions after submit
        Array.from(e.target.elements).forEach(ele => ele.setAttribute("disabled", "disabled"))

        // Check if all questions are answered 
        if (Object.values(userAnswers).find(answers => answers.length === 0)) {
            // All questions not answered
            this.setState({missingAnswerMsg: "You need to answer all questions before submitting the quiz"})
        } else {
            // All questions answered
            let maxPoints = 0;
            let finalScore = 0;
            
            questions.forEach((question, index) => {
                // Calc max points for question and save it to overal max
                const questionMaxPoints = question.correctAnswers.length * question.pointsPerAnswer
                maxPoints += questionMaxPoints

                // Calc questions score based on how many points each answer is worth
                let questionScore = userAnswers[index].reduce((score, answer) => {
                    return question.correctAnswers.indexOf(answer) >= 0 ? 
                        score += question.pointsPerAnswer : 
                        score -= question.pointsPerAnswer
                }, 0)

                // set question score to 0 if below and assign it to overall score
                if(questionScore < 0)  questionScore = 0 
                finalScore += questionScore
            })

            this.setState({
                submited: true,
                missingAnswerMsg: "",
                maxScore: maxPoints,
                score: finalScore,
            })
        }
    }

    render() {
        const { questions, title, missingAnswerMsg, score, maxScore, submited } = this.state
        return (
            <div className="container text-center">
                {title ? (
                    <>
                        <h1 className="my-4 font-weight-bold">{title.toUpperCase()}</h1>
                        <form onSubmit={this.handleSubmit}>
                            {questions.map((question, index) => 
                                <Question 
                                    key={index} 
                                    questionKey={index} 
                                    question={question} 
                                    onChange={e => this.handleChange(index, e)}
                                />
                            )}
                            { missingAnswerMsg && 
                                <div className="alert alert-warning" role="alert">{missingAnswerMsg}</div> 
                            }
                            { submited > 0 &&
                                <div className="alert alert-info" role="alert">You scored {score}/{maxScore}</div>
                            }
                            <button type="submit" className="btn btn-outline-primary">Submit</button>
                        </form> 
                    </>
                    ):
                    <p className="my-4">Loading...</p>
                }
            </div>
        )
    }
}

export default Quiz