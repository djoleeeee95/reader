import { BookItemType, Category } from "../../types";
import { ActionType } from "../action-types";

export const addToMyBooks = (book: BookItemType) => {
    return {
        type: ActionType.ADD_TO_MY_BOOKS,
        payload: book
    }
}

export const selectBook = (bookKey: string) => {
    return {
        type: ActionType.SELECT_BOOK,
        payload: bookKey
    }
}

export const markDone = (key: string, done: boolean) => {
    return {
        type: ActionType.MARK_DONE,
        payload: {
            key,
            done
        }
    }
}

export const addCategory = (category: Category) => {
    return {
        type: ActionType.ADD_CATEGORY,
        payload: category
    }
}

export const addToCategory = (categoryId: number, bookKey: string) => {
    return {
        type: ActionType.ADD_TO_CATEGORY,
        payload: {
            categoryId,
            bookKey
        }
    }
}

export const editNote = (book: string, note: string) => {
    return {
        type: ActionType.EDIT_NOTE,
        payload: {
            book,
            note
        }
    }
}