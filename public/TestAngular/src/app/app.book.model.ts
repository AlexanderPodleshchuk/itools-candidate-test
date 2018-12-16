export interface Book {
    _id: number;
    name: string;
    pages: number;
    isbn: string;
    year: number;
    ebook: boolean;
    publishing: string;
    author: number[];
}
