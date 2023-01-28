import React from "react";
import "./bookItem.css";
import { BookItemType } from "../../types";
import { useActions } from "../../hooks/use-actions";
import { useNavigate } from "react-router-dom";
import { useTypedSelector } from "../../hooks/use-typed-selector";

interface BookItemProps {
  book: BookItemType;
  bookAdded: (bookKey: string) => void;
}

const BookItem: React.FC<BookItemProps> = ({ book, bookAdded }) => {
  const { title, key } = book;

  const { addToMyBooks } = useActions();
  const myBooks = useTypedSelector((state) => state.books.myBooks);

  const navigate = useNavigate();

  const addBook = () => {
    if (checkBook().length === 0) {
      book.done = false;
      book.categories = [];
      book.note = "";
      addToMyBooks(book);
      navigate("/");
      bookAdded(key);
    } else {
      window.alert("Knjiga je vec dodata!");
    }
  };

  // funkcija proverava da li je knjiga ranije vec dodata u korisnikove knjige
  const checkBook = () => {
    return myBooks.filter((myBook) => myBook.key === key);
  };

  return (
    <div className="book">
      <p className="text-base">{title}</p>
      <i
        className="pi pi-plus-circle plus"
        style={{ fontSize: "1.5em" }}
        onClick={addBook}
      ></i>
    </div>
  );
};

export default BookItem;
