import { BookItemType, Category } from "../../types";
import { ActionType } from "../action-types";

export interface AddToMyBooksAction {
    type: ActionType.ADD_TO_MY_BOOKS,
    payload: BookItemType
}

export interface SelectBookAction {
    type: ActionType.SELECT_BOOK,
    payload: string
}

export interface MarkDoneAction {
    type: ActionType.MARK_DONE,
    payload: {
        key: string,
        done: boolean
    };
}

export interface AddCategoryAction {
    type: ActionType.ADD_CATEGORY,
    payload: Category
}

export interface AddToCategoryAction {
    type: ActionType.ADD_TO_CATEGORY,
    payload: {
        categoryId: number,
        bookKey: string
    }
}

export interface EditNote {
    type: ActionType.EDIT_NOTE,
    payload: {
        book: string,
        note: string
    }
}

export type Action =
    AddToMyBooksAction
    | SelectBookAction
    | MarkDoneAction
    | AddCategoryAction
    | AddToCategoryAction
    | EditNote;