import React, { useEffect, useState } from "react";
import { InputText } from "primereact/inputtext";
import "./searchBar.css";

interface SearchBarProps {
  showSearchList: (showList: boolean) => void;
  emitKeyword: (keyword: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  showSearchList,
  emitKeyword,
}) => {
  const [keyword, setKeyword] = useState<string>("");
  const [showList, setShowList] = useState<boolean>(false);

  useEffect(() => {
    // tajmer postavljen da se string za pretragu salje samo ako prodje pola sekunde od
    // korisnikovog poslednjeg unosa, kako bi se izbeglo bespotrebno slanje requesta
    // nakon svakog unosa
    const timeout = setTimeout(() => {
      showSearchList(showList);
      emitKeyword(keyword);
    }, 500);

    return () => {
      clearTimeout(timeout);
    };
  }, [keyword, showList]);

  // Funkcija koja postavlja kljucnu rec za pretragu
  // i indikator prikaza liste dobijenih rezultata
  const setInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
    setShowList(true);
  };

  return (
    <div className="search-bar">
      <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText
          className="search-input"
          value={keyword}
          onChange={setInput}
          placeholder="Unesite naziv knjige"
        />
      </span>
    </div>
  );
};

export default SearchBar;
