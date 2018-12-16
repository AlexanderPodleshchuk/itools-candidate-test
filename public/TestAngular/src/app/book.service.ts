import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Book } from 'itools-candidate-test/public/TestAngular/src/app/app.book.model';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  uri = 'http://localhost:3000/';
  constructor(private http: HttpClient) { }

  getBooks() {
    return this.http.get<Book[]>(`${this.uri}api/books`);
  }

  getBookById(id: number) {
    return this.http.get<Book>(`${this.uri}api/books/${id}`);
  }

  addBook(book: Book) {
    return this.http.post<Book>(`${this.uri}api/books/`, book);
  }
  updateBook(book: Book) {
    const id = book._id;
    return this.http.put<Book>(`${this.uri}api/books/${id}`, book);
  }

  deleteBook(id) {
    return this.http.delete(`${this.uri}api/books/${id}`);
  }
}
