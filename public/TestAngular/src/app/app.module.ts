import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';

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
  MatAutocompleteModule, MatChipsModule
} from '@angular/material';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AuthorsService } from 'itools-candidate-test/public/TestAngular/src/app/services/authors.service';
import { BookService } from 'itools-candidate-test/public/TestAngular/src/app/services/book.service';
import { AuthorComponent } from './components/author/author.component';
import { CreateauthorComponent } from './components/author/createauthor/create.component';
import { BooksComponent } from './components/books/books.component';
import { CreatebookComponent } from './components/books/createbook/createbook.component';


const routes: Routes = [

  { path: 'author/:id', component: CreateauthorComponent },
  { path: 'authors', component: AuthorComponent },
  { path: '', redirectTo: 'authors', pathMatch: 'full' },

  { path: 'book/:id', component: CreatebookComponent },
  { path: 'books', component: BooksComponent },
  { path: '', redirectTo: 'books', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,
    AuthorComponent,
    CreateauthorComponent,
    BooksComponent,
    CreatebookComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CommonModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
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
    MatMenuModule,
    MatPaginatorModule,
    MatSortModule
  ],
  providers: [
    AuthorsService,
    BookService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
