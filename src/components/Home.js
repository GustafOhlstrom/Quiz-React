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
        <ul className="mx-auto">{title}</ul>
      </div>
    );
  }
}

export default Home;
