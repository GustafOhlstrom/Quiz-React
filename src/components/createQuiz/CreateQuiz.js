import "./createQuiz.scss";
import React, { Component } from "react";
import CreateQuestion from "./CreateQuestion";
import { db } from "../../config/fbConfig";
import cardImage from "../images/questions.jpg";

function getId() {
  const uniqid = require("uniqid");
  return uniqid();
}

class CreateQuiz extends Component {
  state = {
    title: "",
    questions: {},
    errMsg: "",
  };

  handleTitleChange = e => this.setState({ title: e.target.value });

  // Question handlers

  handleQuestionChange = (e, questionKey) => {
    const value = e.target.value;
    this.setState(state => {
      let questions = { ...state.questions };
      questions[questionKey].question = value;
      return { questions: questions };
    });
  };

  handleNewQuestionClick = () => {
    this.setState(state => {
      let questions = { ...state.questions };

      // Create new empty question with unique ids
      questions["Q" + getId()] = {
        question: "",
        answers: {
          ["A" + getId()]: "",
          ["A" + getId()]: ""
        },
        correctAnswers: {},
        pointsPerAnswer: 1
      };
      return { questions: questions };
    });
  };

  handleRemoveQuestionClick = questionKey => {
    this.setState(state => {
      let questions = { ...state.questions };
      delete questions[questionKey];
      return { questions: questions };
    });
  };

  handlePointsChange = (e, questionKey) => {
		const value = e.target.value;
		if(typeof Number(value) === 'number' && value <= 999) {
			this.setState(state => {
				let questions = { ...state.questions };
				questions[questionKey].pointsPerAnswer = Number(value);
				return { questions: questions };
			});
		}
  };

  // Answers handlers

  handleAnswerChange = (e, answerChecked, answerKey, questionKey) => {
    // Name stores answer index
    const { value } = e.target;
    this.setState(state => {
      let questions = { ...state.questions };
      // Update correct answer if checked as one
      if (answerChecked) questions[questionKey].correctAnswers[answerKey] = value;
			// Update answer value
			questions[questionKey].answers[answerKey] = value;
			return { questions: questions };
    });
  };

  handleNewAnswerClick = questionKey => {
    this.setState(state => {
      let questions = { ...state.questions };
      questions[questionKey].answers["A" + getId()] = "";
      return { questions: questions };
    });
  };

  handleCorrectAnswerChange = (e, answer, answerKey, questionKey) => {
    const { checked } = e.target;
    this.setState(state => {
      let questions = { ...state.questions };
      // Add or remove answer from correctAnswers
      checked
        ? (questions[questionKey].correctAnswers[answerKey] = answer)
        : delete questions[questionKey].correctAnswers[answerKey];

      return { questions: questions };
    });
  };

  handleRemoveAnswerClick = (answerKey, questionKey) => {
    // Check if more than two answers exists
    if (Object.keys(this.state.questions[questionKey].answers).length > 2) {
      this.setState(state => {
        let questions = { ...state.questions };
        // remove answer and remove answer from correctAnser
        delete questions[questionKey].answers[answerKey];
        delete questions[questionKey].correctAnswers[answerKey];

        return { questions: questions };
      });
    } else {
      alert("Each question need to contain more than two answers");
    }
  };

  // Create the quiz

  handleSubmit = e => {
    e.preventDefault();
    const { title, questions } = this.state;

    // Check if title is empty
    if (title) {
      let submit = true;
      Object.keys(questions).forEach(questionKey => {
        // Check if questions are empty
        if (questions[questionKey].question) {
          // Check if answers are empty
          Object.keys(questions[questionKey].answers).forEach(answerKey => {
            if (!questions[questionKey].answers[answerKey]) {
              submit = false;
              this.setState({errMsg: "Quiz answers can't be empty when submitting a quiz"});
            }
          });

          // Check if atleast one correctAnswer is selected
          if (Object.keys(questions[questionKey].correctAnswers).length < 1) {
            submit = false;
            this.setState({errMsg: "A correct answer needs to be selected for each question before submitting a quiz"});
          }
        } else {
          submit = false;
          this.setState({errMsg: "Quiz questions cannot be empty when submitting a quiz"});
        }
      });

      // Submit quiz
      if (submit) {
        db.collection("quizes")
          .add({ 
            title: this.state.title,
            questions: this.state.questions
          })
          .then(doc => {
            this.props.history.push("/" + doc.id);
          })
          .catch(err => alert("Error adding quiz: ", err));
      }
    } else {
      this.setState({errMsg: "Quiz needs a title to be submitted"});
    }
  };

  render() {
    const { title, questions, errMsg } = this.state;
    return (
        !this.props.user ?  
            (<div className="container alert alert-secondary mt-5 text-center" role="alert">
                You need to be logged in to create a quiz
            </div>) : 
            (<div id="createQuiz">
                <div className="quiz-title mx-auto my-5 container">
                  <div className="card bg-light text-white text-center">
                      <img
                        className="card-img"
                        src={cardImage}
                        alt="Questionmark of question"
                      />

                      <div className="card-img-overlay align-items-center d-flex justify-content-center">
                        <h1 className="card-title">Create a quiz</h1>
                      </div>
                  </div>
                </div>
                <form onSubmit={this.handleSubmit} className="container mb-5">
                  {/* Quiz Title */}
                  <div className="input-group mb-5">
                      <div className="input-group mb-2">
                      <div className="input-group-prepend">
                          <div className="input-group-text">
                          <label className="mb-0" htmlFor="title">
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

                  {Object.keys(questions).map(questionKey => {
                      return (
                      <CreateQuestion
                          key={questionKey}
                          question={questions[questionKey]}
                          questionKey={questionKey}
                          // Used in CreateQuestion
                          onQuestionChange={e => this.handleQuestionChange(e, questionKey)}
                          onRemoveQuestionClick={() => this.handleRemoveQuestionClick(questionKey)}
                          onNewAnswerClick={() => this.handleNewAnswerClick(questionKey)}
                          onPointsChange={e => this.handlePointsChange(e, questionKey)}
                          // Used in Create Answer
                          onAnswerChange={(e, answerChecked, answersKey) => this.handleAnswerChange(e, answerChecked, answersKey, questionKey)}
                          onCorrectAnswerChange={(e, answer, answersKey) => this.handleCorrectAnswerChange(e, answer, answersKey,questionKey)}
                          onRemoveAnswerClick={answerIndex => this.handleRemoveAnswerClick(answerIndex, questionKey)}
                      />
                      );
                  })}

                  {/* New Question Button */}
                  <div className="form-group">
                      <button
                      className="btn btn-outline-dark d-block ml-auto"
                      type="button"
                      onClick={this.handleNewQuestionClick}
                      >
                      Add Question
                      </button>
                  </div>

                  {/* From Submit Button and error msg*/}
                  <div className="mt-5">
                    {errMsg && ( <p className="text-warning text-center mb-3">{errMsg}</p>)}
                    <div className="form-group">
                        <button 
                          type="submit" 
                          className="btn btn-outline-dark d-block mx-auto"
                        >
                          Submit
                        </button>
                    </div>
                  </div>
                </form>
            </div>
            )
    );
  }
}

export default CreateQuiz;
