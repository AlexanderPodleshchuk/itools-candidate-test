import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Book } from '../models/book.model';

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
    const fromData = new FormData();
    return this.http.post<Book>(`${this.uri}api/books/`, book);
  }
  updateBook(book: Book) {
    const id = book._id;
    return this.http.put<Book>(`${this.uri}api/books/${id}`, book);
  }

  deleteBook(id) {
    return this.http.delete(`${this.uri}api/books/${id}`);
  }

  uploadImage(image: File) {
    const formData = new FormData();
    formData.append('image', image);
    return this.http.post<String>(`${this.uri}api/books/upload-image`, formData);
  }

  getImage(id: String) {
    return this.http.get<any>(`${this.uri}api/books/image/${id}`);
  }
}
