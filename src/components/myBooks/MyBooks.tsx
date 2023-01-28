import React, { useEffect, useState } from "react";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import "./myBooks.css";
import { useTypedSelector } from "../../hooks/use-typed-selector";
import MyBook from "../myBook/MyBook";
import { BookItemType, Category } from "../../types";

const MyBooks: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category>({
    id: 0,
    name: "",
  });
  const [filterWord, setFilterWord] = useState<string>("");
  const [filteredBooks, setFilteredBooks] = useState<BookItemType[]>([]);

  const myBooks = useTypedSelector((state) => state.books.myBooks);
  const options = useTypedSelector((state) => state.books.categories);

  useEffect(() => {
    filterMyBooks();
  }, [filterWord]);

  //prikaz knjiga, renderuje se drugaciji sadrzaj zavisno od toga da li postoje odte knjige,
  // i da li je kucano nesto u polje za filtriranje
  const renderMyBooks =
    myBooks.length === 0 ? (
      <div>
        <div className="no-books">Trenutno nemate dodatih knjiga.</div>
        <div className="no-books">
          Unesite naziv knjige, koju zelite da dodate, u polje za pretragu.
        </div>
      </div>
    ) : filterWord ? (
      filteredBooks.map((book) => {
        if (
          book.categories.includes(selectedCategory?.id) ||
          selectedCategory.id === 0
        ) {
          return <MyBook key={book.key} book={book} />;
        }
      })
    ) : (
      myBooks.map((book) => {
        if (
          book.categories.includes(selectedCategory?.id) ||
          selectedCategory.id === 0
        ) {
          return <MyBook key={book.key} book={book} />;
        }
      })
    );

  // funkcija filtrira knjige na osnovu korisnickog unosa
  const filterMyBooks = () => {
    setFilteredBooks(
      myBooks.filter((book) =>
        book.title.toLowerCase().includes(filterWord.toLowerCase())
      )
    );
  };

  return (
    <div className="my-books">
      {myBooks.length !== 0 && (
        <div className="filters">
          <span className="p-input-icon-left filter-input">
            <i className="pi pi-search" />
            <InputText
              className="w-full"
              onChange={(e) => setFilterWord(e.target.value)}
              placeholder="Pretrazite svoje knjge"
            />
          </span>
          <div>
            <Dropdown
              placeholder="Sve knjige"
              value={selectedCategory}
              options={options}
              optionLabel="name"
              onChange={(e) => setSelectedCategory(e.target.value)}
            />
            &nbsp;
            <Button
              icon="pi pi-times"
              tooltip="Ukinite filter"
              onClick={() => setSelectedCategory({ id: 0, name: "" })}
            />
          </div>
        </div>
      )}
      <div className="books">{renderMyBooks}</div>
    </div>
  );
};

export default MyBooks;
