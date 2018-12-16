import { Component, OnInit } from '@angular/core';
import { BookService } from 'itools-candidate-test/public/TestAngular/src/app/services/book.service';
import { Router } from '@angular/router';

import { Book } from '../../models/book.model';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {

  books: Book[] = [];
  displayedColumns = ['_id', 'name', 'pages', 'isbn', 'year', 'ebook', 'publishing', 'author', 'actions'];

  constructor(private booksService: BookService, private router: Router) {

  }

  ngOnInit() {
    this.fetchBooks();
  }

  fetchBooks() {

    this.booksService
      .getBooks()
      .subscribe(data => {
        this.books = data;
        console.log('Data requested ... ');
        console.log(this.books);
      });

  }

  editBooks(_id) {
    this.router.navigate([`/book/${_id}`]);
  }

  deleteBooks(_id) {
    this.booksService.deleteBook(_id).subscribe(() => {
      this.fetchBooks();
    });
  }
}
