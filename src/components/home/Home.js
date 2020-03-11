import React from "react";
import { db } from "../../config/fbConfig";
import { NavLink } from "react-router-dom";
import "./home.scss";
 
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
			return (
				<div key={q.id} className="col-12 card bg-light col-md-3 ">
					<div className="card-body align-items-center d-flex justify-content-center">
						<h5 className="card-title text-center">{q.title.charAt(0).toUpperCase() + q.title.slice(1)}</h5>
					</div>
					<NavLink to={"/" + q.id}  className=" btn btn-outline-dark mb-2">
						Go to quiz
					</NavLink>
				</div>
			);
		})
		: "";

		return (
			<div id="home" className="container">
				<div className="row d-flex justify-content-center cardsDiv"> 
					{this.state.errorMessage ? 
						<p className="alert alert-warning errorP" role="alert">{this.state.errorMessage}</p> :
						cardTitle
					}
				</div>
			</div>
		);
  }
}
 
export default Home;