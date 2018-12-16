import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Author } from '../models/author.model';

@Injectable({
  providedIn: 'root'
})
export class AuthorsService {

  uri = 'http://localhost:3000/';

  constructor(private http: HttpClient) { }

  getAuthors() {
    return this.http.get<Author[]>(`${this.uri}api/authors`);
  }

  getAuthorById(id: number) {
    return this.http.get<Author>(`${this.uri}api/authors/${id}`);
  }

  addAuthor(author: Author) {
    return this.http.post<Author>(`${this.uri}api/authors/`, author);
  }
  updateAuthor(author: Author) {
    const id = author._id;
    return this.http.put<Author>(`${this.uri}api/authors/${id}`, author);
  }

  deleteAuthor(id) {
    return this.http.delete(`${this.uri}api/authors/${id}`);
  }
}
