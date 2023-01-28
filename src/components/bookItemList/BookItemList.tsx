import React, { useState, useEffect } from "react";
import { Card } from "primereact/card";
import { ProgressSpinner } from "primereact/progressspinner";
// import * as _ from 'lodash';
import "./bookItemList.css";
import { BookItemType, BookResponse } from "../../types";
import books from "../../apis/books";
import BookItem from "../bookItem/BookItem";

interface BookItemListProps {
  showList: boolean;
  searchKeyword: string;
}

const BookItemList: React.FC<BookItemListProps> = ({
  showList,
  searchKeyword,
}) => {
  const [showSpinner, setShowSpinner] = useState<boolean>(true);
  const [response, setResponse] = useState<BookItemType[]>([]);

  useEffect(() => {
    getBooks();
    removeList();
    checkOngoingRequest();
  }, [searchKeyword]);

  const getBooks = async () => {
    if (searchKeyword) {
      const response = await books.get<BookResponse>("", {
        params: {
          title: searchKeyword,
        },
      });
      const booksFromResponse = response.data.docs.map(
        (book: BookItemType): BookItemType => {
          const {
            title,
            author_name,
            subject,
            first_publish_year,
            number_of_pages_median,
            key,
          } = book;
          return {
            title,
            first_publish_year,
            number_of_pages_median,
            author_name,
            subject,
            key,
            done: false,
            categories: [],
            note: "",
          };
        }
      );
      setResponse(booksFromResponse);
    }
  };

  // Ukoliko se obrise sve iz unosa za pretragu, prazni se lista sa odgovora
  // (knjige koje su pristigle sa servera)
  const removeList = () => {
    if (!searchKeyword) {
      setResponse([]);
    }
  };

  // provera da li je request u toku
  // ako jeste, prikazuje se spiner
  const checkOngoingRequest = () => {
    books.interceptors.request.use(
      (config) => {
        setShowSpinner(true);
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
    books.interceptors.response.use(
      (response) => {
        setShowSpinner(false);
        return response;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  };

  // funkcija uklanja knjigu iz liste knjiga pristiglih sa servera
  // ako je korisnik pritisnuo dugme za dodavanje navedene knjige u svoje knjige
  const removeBook = (e: string) => {
    setResponse(response.filter((res) => res.key !== e));
  };

  const responseBooks =
    response.length > 0
      ? response.map((res: BookItemType) => {
          return <BookItem bookAdded={removeBook} key={res.key} book={res} />;
        })
      : "Za unetu pretragu ne postoji rezultat";

  return (
    <div className="book-item-list">
      {showList && (
        <div>
          {!showSpinner ? (
            <Card>
              <div className="list">{responseBooks}</div>
            </Card>
          ) : (
            <Card>
              <div>
                <div className="spinner">
                  <ProgressSpinner />
                </div>
              </div>
            </Card>
          )}
        </div>
      )}
    </div>
  );
};

export default BookItemList;
