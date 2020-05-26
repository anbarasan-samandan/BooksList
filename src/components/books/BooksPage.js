import { useEffect, useState } from "react";
import axios from "axios";
import * as constants from "../common/constants";

/*
 * A functional component encompasses the logic for fetching the books from
 * the server...
 */
function booksPage(pageNumber) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [books, setBooks] = useState([]);
  const [bookCount, setBookCount] = useState(0);
  const [hasMore, setHasMore] = useState(false);

  /*
   * Fetches the books list and the total count of the books from the server.
   * The total count of the books is required to determine whether all the
   * books has been fetched from the server.
   */
  useEffect(() => {
    setLoading(true);
    setError(false);

    axios({
      method: "GET",
      url: `${process.env.API_URL}/books/`,
      params: { page: pageNumber, limit: constants.PAGE_SIZE },
    })
      .then((res) => {
        setBookCount(() => {
          return res.data.booksCount;
        });

        setBooks((prevBooks) => {
          if (bookCount > 0) {
            return [...new Set([...prevBooks, ...res.data.books])];
          } else {
            setBooks([]);
          }
        });

        let currentBookCount = pageNumber * constants.PAGE_SIZE;
        let isMoreBooks = bookCount > currentBookCount;

        setHasMore(isMoreBooks);

        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
        setError(true);
      });
  }, [bookCount > 0, pageNumber]);
  return { loading, error, books, hasMore, bookCount };
}

export default booksPage;
