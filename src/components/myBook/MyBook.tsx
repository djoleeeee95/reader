import React from "react";
import { useNavigate } from "react-router-dom";
import "./myBook.css";
import { BookItemType } from "../../types";
import { useActions } from "../../hooks/use-actions";

interface MyBookProps {
  book: BookItemType;
}

const MyBook: React.FC<MyBookProps> = ({ book }) => {
  const { title, done, key } = book;

  const navigate = useNavigate();
  const { selectBook } = useActions();

  const onBookClick = () => {
    selectBook(key);
    navigate("/title/" + title);
  };

  return (
    <div className="my-book">
      <div className="book-title" onClick={() => onBookClick()}>
        {title}
      </div>
      <div className="my-auto">
        {done ? (
          <div className="text-sm">
            Procitano
            <i className="pi pi-check ml-2"></i>
          </div>
        ) : (
          <div className="text-sm">
            Nije procitano
            <i className="pi pi-times x ml-2"></i>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBook;
