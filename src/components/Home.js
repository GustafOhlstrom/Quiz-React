import React, { Component } from 'react'
import db from '../config/fbConfig'

class Home extends Component {
    state = {
        quizes: null,
    }

    componentDidMount = () => {
        db.collection('quizes').get()
            .then(snapshot => {
                const quizes = 
                snapshot.docs.map(quiz => ({...quiz.data(), id: quiz.id}))
                this.setState({quizes})
            })
            .catch(err => console.log(err))
    }

    render() {
        return (
            <h1>Quiz</h1>
        )
    }
}

export default Home