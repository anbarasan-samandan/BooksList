import React, { useState, useRef, useCallback } from "react";
import BooksPage from "./BooksPage";
import { Link } from "react-router-dom";
import StarRatingComponent from "react-star-rating-component";
import StickyTable from "react-sticky-table-thead";

export default function BookList() {
  const [pageNumber, setPageNumber] = useState(1);
  const { books, hasMore, loading, error } = BooksPage(pageNumber);

  const observer = useRef();

  const lastBookElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber((prevPageNumber) => prevPageNumber + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  const imageStyle = {
    width: "80px",
    height: "80px",
  };

  const tableHeaderStyle = { backgroundColor: "#ffc107" };

  return (
    <>
      <h2 className="text-warning">Books</h2>
      <StickyTable height={600}>
        <table className="table table-light table-bordered table-hover">
          <thead style={tableHeaderStyle}>
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Title</th>
              <th>Author</th>
              <th>Price</th>
              <th>Rating</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book, index) => {
              if (books.length === index + 1) {
                return (
                  <tr ref={lastBookElementRef} key={index}>
                    <td key={index}>{book.id}</td>
                    <td>
                      <img
                        src={`${process.env.API_URL}/` + book.image}
                        alt="new"
                        style={imageStyle}
                      />
                    </td>
                    <td>
                      <Link
                        to={{
                          pathname: "/book/" + book.id,
                          book: book,
                        }}
                      >
                        {book.title}
                      </Link>
                    </td>
                    <td>{book.author}</td>
                    <td>{book.price}</td>
                    <td>
                      <StarRatingComponent
                        name="rating1"
                        starCount={5}
                        value={book.rating}
                      />
                    </td>
                  </tr>
                );
              } else {
                return (
                  <tr key={index}>
                    <td>{book.id}</td>
                    <td>
                      <img
                        src={`${process.env.API_URL}/` + book.image}
                        alt="Image"
                        style={imageStyle}
                      />
                    </td>
                    <td>
                      <Link to={"/book/" + book.id}>{book.title}</Link>
                    </td>
                    <td>{book.author}</td>
                    <td>{book.price}</td>
                    <td>
                      <StarRatingComponent
                        name="rating1"
                        starCount={5}
                        value={book.rating}
                      />
                    </td>
                  </tr>
                );
              }
            })}
          </tbody>
        </table>
      </StickyTable>
      <div className="text-light">{loading && "Loading..."}</div>
      <div className="text-light">{error && "Error"}</div>
    </>
  );
}
