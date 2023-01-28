import React from "react";
import { Checkbox } from "primereact/checkbox";
import { Divider } from "primereact/divider";
import "./bookInfo.css";
import { BookItemType } from "../../types";
import Categories from "../categories/Categories";
import Note from "../note/Note";
import { useActions } from "../../hooks/use-actions";

interface BookInfoProps {
  book: BookItemType;
}

export const BookInfo: React.FC<BookInfoProps> = ({ book }) => {
  const {
    title,
    author_name,
    subject,
    number_of_pages_median,
    done,
    key,
    first_publish_year,
  } = book;

  const authors = author_name?.map((author) => {
    return <div key={author}>{author}</div>;
  });

  const subjects = subject ? (
    subject?.map((subject) => {
      return <div key={subject}>{subject}</div>;
    })
  ) : (
    <em className="text-sm">Ne postoje teme za ovu knjigu</em>
  );

  const { markDone } = useActions();

  const markBook = () => {
    markDone(key, !done);
  };
  return (
    <div className="grid">
      <div className="col">
        <div className="title">{title}</div>
        <div className="infos">{authors}</div>
        <p className="infos">Godina izdanja: {first_publish_year} </p>
        <p className="infos">Broj strana: {number_of_pages_median} </p>
        <div className="font-bold">Teme:</div>
        <div className="subject">{subjects}</div>
      </div>
      <div className="col right">
        <div className="inner">
          <div className="mb-3">
            <label className="text-lg" htmlFor="done">
              Procitano
            </label>
            &nbsp;
            <Checkbox inputId="done" checked={done} onChange={markBook} />
          </div>
          <Divider />
          <Categories book={book} />
          <Divider />
          <Note book={book} />
        </div>
      </div>
    </div>
  );
};

export default BookInfo;
