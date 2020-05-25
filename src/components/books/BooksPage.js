import { useEffect, useState } from "react";
import axios from "axios";

function booksPage(pageNumber) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [books, setBooks] = useState([]);
  const [bookCount, setBookCount] = useState(0);
  const [hasMore, setHasMore] = useState(false);

  const tableHeaders = ["#", "Image", "Title", "Author", "Price", "Rating"];
  const pageSize = 10;

  useEffect(() => {
    setLoading(true);
    setError(false);

    axios({
      method: "GET",
      url: `${process.env.API_URL}/books/`,
      params: { page: pageNumber, limit: pageSize },
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

        let currentBookCount = pageNumber * pageSize;
        let isMoreBooks = bookCount > currentBookCount;
        console.log("Current book count: " + currentBookCount);
        console.log("Has more: " + isMoreBooks);

        setHasMore(isMoreBooks);

        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
        setError(true);
      });
  }, [bookCount > 0, pageNumber]);
  return { loading, error, books, hasMore, bookCount, tableHeaders };
}

export default booksPage;
