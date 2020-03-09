import React from "react";
import { db } from "../config/fbConfig";
import cardImage from "../components/images/questions.jpg";

class Home extends React.Component {
  state = {
    quizes: ""
  };

  componentDidMount() {
    db.collection("quizes")
      .get()
      .then(snapshot => {
        const quizes = [];
        snapshot.forEach(doc => {
          quizes.push({
            id: doc.id,
            ...doc.data()
          });
        });
        this.setState({
          quizes
        });
      })
      .catch(err => console.log(err));
  }

  render() {
    const title = this.state.quizes
      ? this.state.quizes.map((q, i) => {
          return <li key={i}>{q.title}</li>;
        })
      : "hello";

    return (
      <div className="homepage mx-auto my-5">
        <div className="card bg-light text-white text-center">
          <img
            className="card-img"
            src={cardImage}
            style={{
              maxHeight: "200px",
              maxWidth: "100%",
              objectFit: "cover"
            }}
            alt="Questionmark of question"
          />

          <div className="card-img-overlay align-items-center d-flex justify-content-center">
            <h1 className="card-title">Quizes</h1>
          </div>
        </div>

        <ul className="mx-auto">{title}</ul>
      </div>
    );
  }
}

export default Home;
