export interface BookResponse {
    docs: BookItemType[]
}

export interface BookItemType {
    title: string,
    first_publish_year: number,
    number_of_pages_median: number,
    author_name: [],
    subject: [],
    key: string,
    done: boolean,
    categories: number[],
    note: string
}

export interface Category {
    id: number;
    name: string
}