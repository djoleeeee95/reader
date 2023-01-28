import { Action } from "../actions";
import { ActionType } from "../action-types";
import { BookItemType, Category } from "../../types";

interface BooksState {
    myBooks: BookItemType[];
    selectedBook: string;
    categories: Category[]
}

const initialState: BooksState = {
    myBooks: [],
    selectedBook: '',
    categories: []
}

const booksReducer = (state: BooksState = initialState, action: Action): BooksState => {
    switch (action.type) {
        case ActionType.ADD_TO_MY_BOOKS:
            return {
                ...state,
                myBooks: [action.payload, ...state.myBooks]
            }
        case ActionType.SELECT_BOOK:
            return {
                ...state,
                selectedBook: action.payload
            }
        case ActionType.MARK_DONE:
            const { key, done } = action.payload
            // pronalazenje knjige koje treba oznaciti kao procitana
            // i dodeljivanje statusa procitanosti
            const myBooks = state.myBooks.map((book: BookItemType): BookItemType => {
                return book.key === key ? { ...book, done } : book;
            })
            return {
                ...state, myBooks
            }
        case ActionType.ADD_CATEGORY:
            return {
                ...state,
                categories: [...state.categories, action.payload]
            }
        case ActionType.ADD_TO_CATEGORY:
            const { bookKey, categoryId } = action.payload;
            // pronalazenje knjige kojoj se dodeljuje kategorija
            // i dodeljivanje kategorije
            const myCategorizedBooks = state.myBooks.map((book: BookItemType): BookItemType => {
                return book.key === bookKey ? { ...book, categories: [...book.categories, categoryId] } : book;
            })
            return {
                ...state,
                myBooks: myCategorizedBooks
            }
        case ActionType.EDIT_NOTE:
            const { book, note } = action.payload;
            // pronalazenje knjige kojoj treba izmeniti belesku
            // i dodeljivanje nove beleske
            const booksAddedNote = state.myBooks.map((b: BookItemType): BookItemType => {
                return book === b.key ? { ...b, note } : b;
            })
            return {
                ...state,
                myBooks: booksAddedNote
            }

        default:
            return state;
    }
}

export default booksReducer;