import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import StarRatingComponent from "react-star-rating-component";
import axios from "axios";
import { Link } from "react-router-dom";
import * as constants from "../common/constants";

/*
 * Renders the books details of the selected book in the BookList component.
 * @param {match}: The route parameters, in our case the id of the selected book.
 */
function BookDetails({ match }) {
  let params = match.params;
  const [others, setOthers] = useState([]);
  const [book, setBook] = useState({});

  /*
   * Fetches the details of the books based on the book id and updates the state respectively.
   * Note: The method is fired whenever there is a change in the params.id.
   * The other books from the author are shown as links. When clicking on the links,
   * this method will be invoked.
   */
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

  /*
   * Renders the contents in a responsive that makes use of the available screen width.
   * For larger windows:
   *    -- The book image is shown on the left side.
   *    -- The book details (title, author, rating, description, other books from the author)
   *       are shown on the right side.
   * For smaller windows:
   *    -- The contents are stacked one below the other
   *    -- Rendering order: Image, book details (title, author, rating, description, other books from the author)
   */
  return (
    <>
      <div className="container-fluid">
        <div className="col-md-3" style={constants.leftDiv}>
          <img
            style={constants.imageStyle}
            src={`${process.env.API_URL}/` + book.image}
          />
        </div>

        <div className="col-md-9 text-light" style={constants.rightDiv}>
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
            starCount={constants.STAR_RATING}
            value={book.rating}
          />
          <div>
            <p style={constants.priceStyle} className="badge badge-warning p-2">
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
