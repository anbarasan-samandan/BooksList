import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import StarRatingComponent from "react-star-rating-component";
import axios from "axios";
import "./BookDetails.css";
import { Link } from "react-router-dom";

function BookDetails({ match }) {
  let params = match.params;
  const [others, setOthers] = useState([]);
  const [book, setBook] = useState({});

  useEffect(() => {
    setOthers([]);

    axios({
      method: "GET",
      url: `${process.env.API_URL}/books/` + params.id,
    })
      .then((res) => {
        setBook(() => {
          return res.data.book[0];
        });

        setOthers((prev) => {
          return [...new Set([...prev, ...res.data.booksFromAuthor])];
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }, [params.id]);

  const priceStyle = {
    fontSize: "1em",
  };

  const imageStyle = {
    width: "150px",
    height: "175px",
  };

  const leftDiv = {
    float: "left",
    margin: "2 2 2 2",
  };

  const rightDiv = {
    float: "right",
  };

  return (
    <>
      <div className="container-fluid">
        <div className="col-md-3" style={leftDiv}>
          <img
            style={imageStyle}
            src={`${process.env.API_URL}/` + book.image}
          />
        </div>

        <div className="col-md-9 text-light" style={rightDiv}>
          <h1 className="text-light">{book.title}</h1>
          <div>
            <span>by</span>
            <span
              style={{ fontSize: "16px" }}
              className="text-primary text-lg font-italic"
            >
              {" "}
              {book.author}
            </span>
          </div>
          <StarRatingComponent
            name="rating1"
            starCount={5}
            value={book.rating}
          />
          <div>
            <p style={priceStyle} className="badge badge-warning p-2">
              {book.price}
            </p>
          </div>
          <p></p>
          <p>{book.description}</p>
          <p></p>
          {others.length <= 0 ? (
            <p className="text-info font-weight-bold font-italic">
              There are no other books of this author in our collection!
            </p>
          ) : (
            others.map((bk, index) => {
              return (
                <>
                  {index == 0 && (
                    <p className="text-info font-weight-bold font-italic">
                      Other books from this author:
                    </p>
                  )}
                  <ul key={index}>
                    <li
                      key={index}
                      onClick={() => history.push(`/book/${bk.id}`)}
                    >
                      {" "}
                      <Link to={"/book/" + bk.id}> {bk.title}</Link>
                    </li>
                  </ul>
                </>
              );
            })
          )}
        </div>
      </div>
    </>
  );
}

BookDetails.propTypes = {
  match: PropTypes.object.isRequired,
};

export default BookDetails;
