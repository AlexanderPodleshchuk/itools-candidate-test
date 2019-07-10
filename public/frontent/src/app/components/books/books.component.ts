import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';
import { BasketService } from '../../services/basket.service';
import { Router } from '@angular/router';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

import { Book } from '../../models/book.model';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {

  books: Book[] = [];
  myControl = new FormControl();
  options: string[] = ['Алиса в стране чудес', 'Капитал(том |)', 'Преступление и наказание'];
  filteredOptions: Observable<string[]>;
  constructor(private booksService: BookService, public basketService: BasketService, private router: Router) {

  }

  ngOnInit() {
    this.getBooks();
    this.filteredOptions = this.myControl.valueChanges
    .pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  getBooks() {
    this.booksService.getBooks().subscribe(data => this.books = data, err => console.log(err));
  }

  editBooks(id: number) {
    this.router.navigate([`/book/${id}`]);
  }

  deleteBooks(id: number) {
    this.booksService.deleteBook(id).subscribe(() => this.getBooks(), err => console.log(err));
  }

  onDetailsSelect(id: number) {
    this.router.navigate([`/bookinfo/${id}`]);
  }

  getImagePath(imageId: String) {
    return imageId ? 'http://localhost:3000/api/books/image/' + imageId : 'https://material.angular.io/assets/img/examples/shiba1.jpg';
  }
}
