import "primereact/resources/themes/bootstrap4-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css"
import './App.css';
import Home from './components/home/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import BookInfo from "./components/bookInfo/BookInfo";
import MyBooks from "./components/myBooks/MyBooks";
import { useTypedSelector } from "./hooks/use-typed-selector";

function App() {

  let selectedBook = useTypedSelector(state => {
    const { selectedBook, myBooks } = state.books;
    return myBooks.filter(book => book.key === selectedBook)[0];
  });


  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />}>
          <Route path="/" element={<MyBooks />} />
          <Route path="title/:title" element={<BookInfo book={selectedBook} />} />
        </Route>
      </Routes>
    </Router>

  );
}

export default App;
