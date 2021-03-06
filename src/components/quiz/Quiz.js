import "bootstrap/dist/css/bootstrap.css";
import "./quiz.scss";
import React, { Component } from "react";
import { db } from "../../config/fbConfig";
import Question from "./Question";

class Quiz extends Component {
    state = {
        id: "",
        questions: {},
        title: "",
        userAnswers: {},
        missingAnswerMsg: "",
        score: 0,
        maxScore: 0,
        submited: false,
        errMsg: "",
    }

    componentDidMount = () => {
        db.collection('quizes').doc(this.props.match.params.quiz_id).get()
            .then(snapshot => {
                // Create emtpy userAnswers object using the index as key
                const emptyUserAnswers = {}
                Object.keys(snapshot.data().questions).forEach(key => emptyUserAnswers[key] = [])

                // Create array with random display order for answers
                let questions = {...snapshot.data().questions}
                Object.keys(questions).forEach(key => {
                    // Create array with answer keys, to be sorted
                    questions[key].displayOrder = [...Object.keys(questions[key].answers)]
                    let spotsToFill = questions[key].displayOrder.length
                    let temp
                    let index

                    // While there are spots to fill with a random element
                    while (spotsToFill > 0) {
                        // Pick a random index from unfilled spots
                        index = Math.floor(Math.random() * spotsToFill)
                        // Decrease spotsToFill by 1
                        spotsToFill--
                        // Swap the last element with it
                        temp = questions[key].displayOrder[spotsToFill]
                        questions[key].displayOrder[spotsToFill] = questions[key].displayOrder[index]
                        questions[key].displayOrder[index] = temp
                    }
                })

                this.setState({
                    questions: questions,
                    title: snapshot.data().title, 
                    id: snapshot.id,
                    userAnswers: emptyUserAnswers
                })
            })
            .catch(err => this.setState({errMsg: "Could not find quiz"}))
    }

    handleAnswerChange = (e, questionKey) => {
        const { id, checked } = e.target;
        this.setState(state => {
            let newUserAnswers = { ...state.userAnswers };
            // Add answer if check, remove if unchecked
            checked ? 
                (newUserAnswers[questionKey] = newUserAnswers[questionKey].concat(id)) : 
                (newUserAnswers[questionKey] = newUserAnswers[questionKey].filter(answerKey => answerKey !== id));
        
            return { userAnswers: newUserAnswers };
        });
    };
    
    handleSubmit = e => {
        e.preventDefault()
        const { userAnswers, questions } = this.state

        // Check if all questions are answered 
        if (Object.values(userAnswers).find(answers => answers.length === 0)) {
            // All questions not answered
            this.setState({missingAnswerMsg: "You need to answer all questions before submitting the quiz"})
        } else {
            // Stop form interactions after submit
            Array.from(e.target.elements).forEach(ele => {
                ele.setAttribute("disabled", "disabled")
            })
            // Remove pointer events
            document.querySelector(".quiz-form").classList.add("disable-form")


            // All questions answered
            let maxPoints = 0;
            let finalScore = 0;
            
            Object.keys(questions).forEach(questionKey => {
                // Calc max points for question and save it to overal max
                const questionMaxPoints = Object.keys(questions[questionKey].correctAnswers).length * questions[questionKey].pointsPerAnswer
                maxPoints += questionMaxPoints
                
                // Calc questions score based on how many points each answer is worth
                let questionScore = userAnswers[questionKey].reduce((score, answerKey) => {
                    return questions[questionKey].correctAnswers[answerKey] ?
                        score += Number(questions[questionKey].pointsPerAnswer): 
                        score -= Number(questions[questionKey].pointsPerAnswer) 
                }, 0)

                // set question score to 0 if below and assign it to overall score
                if(questionScore < 0) questionScore = 0 
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
        let resultMsg;
        if(score/maxScore > 0.7) {
            resultMsg = <div className="alert alert-info bg-success text-white" role="alert">You scored {score}/{maxScore}</div>
        } else if (score/maxScore > 0.5) {
            resultMsg = <div className="alert alert-info bg-warning text-white" role="alert">You scored {score}/{maxScore}</div>
        } else {
            resultMsg = <div className="alert alert-info bg-danger text-white" role="alert">You scored {score}/{maxScore}</div>
        }
        return (
            <div id="quiz" className="container text-center">
                {title ? (
                    <>
                        <h1 className="my-4 font-weight-bold">{title.toUpperCase()}</h1>
                        <form onSubmit={this.handleSubmit} className="quiz-form mb-5">
                            {Object.keys(questions).map(questionKey => 
                                <Question 
                                    key={questionKey} 
                                    questionKey={questionKey} 
                                    question={questions[questionKey]} 
                                    onAnswerChange={e => this.handleAnswerChange(e, questionKey)}
                                />
                            )}
                            { missingAnswerMsg && <p className="text-warning text-center mb-3">{missingAnswerMsg}</p> }
                            { submited > 0 && resultMsg }
                            <button type="submit" className="btn btn-outline-dark">Submit</button>
                        </form> 
                    </>
                    ): (this.state.errMsg ?
                        (
                            <div className="alert alert-warning mt-5" role="alert">
                                {this.state.errMsg}
                            </div>
                        ):
                        (
                            <div className="spinner-border mt-5" role="status">
                                <span className="sr-only">Loading...</span>
                            </div>
                        )
                    )
                }
            </div>
        )
    }
}

export default Quiz;
