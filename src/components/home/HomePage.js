import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => (
  <div className="jumbotron bg-warning">
    <h1>Anbu Books List</h1>
    <p className="font-italic">A room without a book is a body without soul!</p>
    <Link to="about" className="btn btn-primary btn-lg btn-dark">
      Learn more
    </Link>
  </div>
);

export default HomePage;
