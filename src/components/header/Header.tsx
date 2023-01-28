import React, { useEffect, useRef, useState } from "react";
import "./header.css";
import SearchBar from "../searchBar/SearchBar";
import BookItemList from "../bookItemList/BookItemList";

const Header: React.FC = () => {
  const [showList, setShowList] = useState<boolean>(false);
  const [keyword, setKeyword] = useState<string>("");
  const ref = useRef<HTMLDivElement | null>(null);

  // funkcija detektuje klik van liste
  // ako se dogodi klik van liste, lista nestaje
  const handleClickOutsideList = (e: any) => {
    if (ref.current && !ref.current.contains(e.target)) {
      setShowList(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutsideList, true);
    return () => {
      document.removeEventListener("click", handleClickOutsideList, true);
    };
  }, []);

  return (
    <div className="header">
      <div className="search" ref={ref} onClick={handleClickOutsideList}>
        <SearchBar showSearchList={setShowList} emitKeyword={setKeyword} />
        <BookItemList showList={showList} searchKeyword={keyword} />
      </div>
    </div>
  );
};

export default Header;
