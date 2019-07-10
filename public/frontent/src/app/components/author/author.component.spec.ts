import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { Observable, observable, of } from 'rxjs';

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
import { AuthorComponent } from './author.component';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthorsService } from 'src/app/services/authors.service';

const routes: Routes = [

  { path: 'authors', component: AuthorComponent },
  { path: '', redirectTo: 'authors', pathMatch: 'full' }
];


describe('AuthorComponent', () => {
  let component: AuthorComponent;
  let fixture: ComponentFixture<AuthorComponent>;
  let authorService: AuthorsService;
  let spyget, spydelete: jasmine.Spy;
  let mockAuthors, mockAuthor;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AuthorComponent],
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
      providers: [AuthorsService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorComponent);
    component = fixture.componentInstance;
    authorService = fixture.debugElement.injector.get(AuthorsService);
    mockAuthors = [{
      _id: 1,
      email: "string",
      firstName: "string",
      secondName: "string",
      birthDate: new Date(2011, 0, 1, 2, 3, 4, 567),
      book: [1, 2]
    },
    {
      _id: 2,
      email: "string",
      firstName: "string",
      secondName: "string",
      birthDate: new Date(2011, 0, 1, 2, 3, 4, 567),
      book: [1, 2]
    }];
    mockAuthor = [{
      _id: 1,
      email: "string",
      firstName: "string",
      secondName: "string",
      birthDate: new Date(2011, 0, 1, 2, 3, 4, 567),
      book: [1, 2]
    }];
    spyget = spyOn(authorService, "getAuthors").and.returnValue(of(mockAuthors));
    spydelete = spyOn(authorService, "deleteAuthor").and.returnValue(of(1));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should work service get authors', () => {

    component.fetchAuthors();
    expect(spyget.calls.all()).toBeTruthy();

  });

  it('should set authors', () => {

    component.fetchAuthors();
    expect(component.authors).toEqual(mockAuthors);

  });

  it('should work service delete', () => {

    component.deleteAuthors(1);
    expect(spydelete.calls.all()).toBeTruthy();

  });
  
});
