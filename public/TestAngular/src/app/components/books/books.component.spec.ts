import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { NO_ERRORS_SCHEMA } from '@angular/core';

import {
  MatToolbarModule,
  MatPaginatorModule,
  MatSortModule,
  MatNativeDateModule,
  MatDatepickerModule,
  MatFormFieldModule,
  MatInputModule,
  MatOptionModule,
  MatSelectModule,
  MatIconModule,
  MatButtonModule,
  MatCardModule,
  MatTableModule,
  MatDividerModule,
  MatSnackBarModule,
  MatAutocompleteModule,
  MatChipsModule
} from '@angular/material'
import { BooksComponent } from './books.component';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { BookService } from 'src/app/services/book.service';

const routes: Routes = [

  { path: 'books', component: BooksComponent },
  { path: '', redirectTo: 'books', pathMatch: 'full' }
];


describe('BooksComponent', () => {
  let component: BooksComponent;
  let fixture: ComponentFixture<BooksComponent>;
  let bookService: BookService;
  let spyget, spydelete: jasmine.Spy;
  let mockBooks;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BooksComponent],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [
        MatToolbarModule,
        MatFormFieldModule,
        MatInputModule,
        MatOptionModule,
        MatNativeDateModule,
        MatDatepickerModule,
        MatSelectModule,
        MatIconModule,
        MatButtonModule,
        MatCardModule,
        MatTableModule,
        MatDividerModule,
        MatSnackBarModule,
        MatAutocompleteModule,
        MatChipsModule,
        MatPaginatorModule,
        MatSortModule,
        HttpClientModule,
        RouterModule.forRoot(routes)
      ],
      providers: [BookService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BooksComponent);
    component = fixture.componentInstance;
    bookService = fixture.debugElement.injector.get(BookService);
    mockBooks =[{
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
    spyget = spyOn(bookService, "getBooks").and.returnValue(of(mockBooks));
    spydelete = spyOn(bookService, "deleteBook").and.returnValue(of(1));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should work service get books', () => {

    component.fetchBooks();
    expect(spyget.calls.all()).toBeTruthy();

  });

  it('should set books', () => {

    component.fetchBooks();
    expect(component.books).toEqual(mockBooks);

  });

  it('should work service delete', () => {

    component.deleteBooks(1);
    expect(spydelete.calls.all()).toBeTruthy();

  });
  
});
