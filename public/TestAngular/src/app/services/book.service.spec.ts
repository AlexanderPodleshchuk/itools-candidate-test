import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { BookService } from './book.service';

describe('BookService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      providers: [BookService]
    });
  });

  it('should be created', inject([BookService], (service: BookService) => {
    expect(service).toBeTruthy();
  }));

  it('should get one book', inject([BookService, HttpTestingController], (service: BookService, backend: HttpTestingController) => {
    const mockBook = {
      _id: 1,
      name: "string",
      pages: 123,
      isbn: "string",
      year: 1975,
      ebook: true,
      publishing: "string",
      author: [1,2]
    };

      service.getBookById(1).subscribe(book => {
        expect(book).toEqual(mockBook);
      });

      backend.expectOne({
        method: 'GET',
        url: 'http://localhost:3000/api/books/1'
      }).flush(mockBook);
  }));

  it('should get all books', inject([BookService, HttpTestingController], (service: BookService, backend: HttpTestingController) => {
    const mockBooks =[{
      _id: 1,
      name: "string",
      pages: 123,
      isbn: "string",
      year: 1975,
      ebook: true,
      publishing: "string",
      author: [1,2]
    },
    {
      _id: 2,
      name: "string",
      pages: 123,
      isbn: "string",
      year: 1975,
      ebook: false,
      publishing: "string",
      author: [1,2]
    }
    ];

      service.getBooks().subscribe(books => {
        expect(books).toEqual(mockBooks);
      });

      backend.expectOne({
        method: 'GET',
        url: 'http://localhost:3000/api/books'
      }).flush(mockBooks);
  }));

  it('should add book', inject([BookService, HttpTestingController], (service: BookService, backend: HttpTestingController) => {
    const addBook = {
      _id: 1,
      name: "string",
      pages: 123,
      isbn: "string",
      year: 1975,
      ebook: true,
      publishing: "string",
      author: [1,2]
    };

      service.addBook(addBook).subscribe(book => {
        expect(book).toBe(addBook);
      });

      backend.expectOne({
        method: 'POST',
        url:'http://localhost:3000/api/books/'        
      }).flush(addBook);
  }));

  it('should update author', inject([BookService, HttpTestingController], (service: BookService, backend: HttpTestingController) => {
    const updateBook = {
      _id: 1,
      name: "string",
      pages: 123,
      isbn: "string",
      year: 1975,
      ebook: true,
      publishing: "string",
      author: [1,2]
    };

      service.updateBook(updateBook).subscribe(book => {
        expect(book).toBe(updateBook);
      });

      backend.expectOne({
        method: 'PUT',
        url:'http://localhost:3000/api/books/1'        
      }).flush(updateBook);
  }));

  it('should delete book', inject([BookService, HttpTestingController], (service: BookService, backend: HttpTestingController) => {
    const deleteBook = {
      _id: 1,
      name: "string",
      pages: 123,
      isbn: "string",
      year: 1975,
      ebook: true,
      publishing: "string",
      author: [1,2]
    };

      service.deleteBook(1).subscribe(book => {
        expect(book).toEqual(deleteBook);
      });

      backend.expectOne({
        method: 'DELETE',
        url:'http://localhost:3000/api/books/1'        
      }).flush(deleteBook);
  }));

});
