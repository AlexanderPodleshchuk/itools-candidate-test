import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import {MatGridListModule} from '@angular/material/grid-list';

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

import { AuthorsService } from './services/authors.service';
import { BookService } from './services/book.service';
import { BasketService } from './services/basket.service';
import { UserService } from './services/user.service';

import { AuthorComponent } from './components/author/author.component';
import { CreateauthorComponent } from './components/author/createauthor/create.component';
import { BooksComponent } from './components/books/books.component';
import { CreatebookComponent } from './components/books/createbook/createbook.component';
import { InfoAboutBookComponent } from './components/books/info-about-book/info-about-book.component';
import { BasketStoreComponent } from './components/books/basket-store/basket-store.component';

const routes: Routes = [

  { path: 'book/:id', component: CreatebookComponent },
  { path: 'bookinfo/:id', component: InfoAboutBookComponent},
  { path:'basketbooks', component: BasketStoreComponent},
  { path: 'books', component: BooksComponent },
  { path: '', redirectTo: 'books', pathMatch: 'full' },

  { path: 'author/:id', component: CreateauthorComponent },
  { path: 'authors', component: AuthorComponent },
  { path: '', redirectTo: 'authors', pathMatch: 'full' }

  
];

@NgModule({
  declarations: [
    AppComponent,
    AuthorComponent,
    CreateauthorComponent,
    BooksComponent,
    CreatebookComponent,
    InfoAboutBookComponent,
    BasketStoreComponent
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
    MatGridListModule,
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
    BookService,
    BasketService,
    UserService
  ],
  bootstrap: [AppComponent],
  schemas: [ NO_ERRORS_SCHEMA ]
})
export class AppModule { }
