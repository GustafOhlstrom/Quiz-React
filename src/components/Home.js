import React from "react";
import { db } from "../config/fbConfig";
<<<<<<< HEAD
import { Link, NavLink } from "react-router-dom";
import "./home.scss";
import Quiz from "./quiz/Quiz";
=======
import cardImage from "../components/images/questions.jpg";
>>>>>>> master

 
class Home extends React.Component {
 state = {
  quizes: [],
  errorMessage:""
 };
 
 componentDidMount() {
 db.collection("quizes").get()
  .then(snapshot => {
    const quizes = [];
      snapshot.forEach(doc => {
        quizes.push({
          id: doc.id,
          ...doc.data()
        });
      });
    if(quizes.length > 1) {
      this.setState({quizes});
    } else {
      this.setState({errorMessage: "Could not find quizes"})
    }
  })
 }
 
 render() {
    const cardTitle = this.state.quizes ?  
    this.state.quizes.map((q) => {

<<<<<<< HEAD
  return (
    <div key={q.id} className="card col-3 "  style={{ height:"10rem", width: "15rem "}}>
      <div className="card-body align-items-center d-flex justify-content-center">
        <h5 className="card-title text-center">{q.title.charAt(0).toUpperCase() + q.title.slice(1)}</h5>
      </div>
      <NavLink to="/Quiz"  className="btn btn-secondary btn-lg mb-2">
       Go to quiz{" "} 
      </NavLink>
    </div>
 );
  })
    : "";

  
 
 return (
    <div className="container">
      <div className="row d-flex justify-content-between"> 
        {this.state.errorMessage ? 
          <p className="alert alert-warning" role="alert">{this.state.errorMessage}</p> :
          cardTitle
        }
     </div>
    </div>
  );
 }
}
 
export default Home;
=======
  render() {
    const title = this.state.quizes
      ? this.state.quizes.map((q, i) => {
          return <li key={i}>{q.title}</li>;
        })
      : "hello";

    return (
      <div className="homepage mx-auto my-5">
        <ul className="mx-auto">{title}</ul>
      </div>
    );
  }
}

export default Home;
>>>>>>> master
