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
    }

    componentDidMount = () => {
        // Get key from router
        db.collection('quizes').doc('LMJT8GjDyaswmAv2CxFq').get()
            .then(snapshot => this.setState({...snapshot.data(), id: snapshot.id}))
            .catch(err => console.log(err))
    }

    render() {
        const { questions, title } = this.state
        return (
            <div className="container text-center">
                {title ? (
                    <>
                        <h1 className="my-4 font-weight-bold">{title.toUpperCase()}</h1>
                        <form>
                        { questions.map((question, index) => <Question key={index} question={question} />) }
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