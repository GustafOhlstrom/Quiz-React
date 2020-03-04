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
        score: 0,
    }

    componentDidMount = () => {
        // Get key from router
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

    render() {
        const { questions, title } = this.state
        return (
            <div className="container text-center">
                {title ? (
                    <>
                        <h1 className="my-4 font-weight-bold">{title.toUpperCase()}</h1>
                        <form>
                            {questions.map((question, index) => 
                                <Question 
                                    key={index} 
                                    questionKey={index} 
                                    question={question} 
                                    onChange={e => this.handleChange(index, e)}
                                />
                            )}
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