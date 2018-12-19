import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthorsService } from './authors.service';

describe('AuthorsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthorsService]
    });
  });

  it('should be created', inject([AuthorsService], (service: AuthorsService) => {
    expect(service).toBeTruthy();
  }));

  it('should get one author', inject([AuthorsService, HttpTestingController], (service: AuthorsService, backend: HttpTestingController) => {
    const mockAuthor = { _id: 1,
      email: "string",
      firstName: "string",
      secondName: "string",
      birthDate: new Date(2011, 0, 1, 2, 3, 4, 567),
      book: [1,2]};

      service.getAuthorById(1).subscribe(author => {
        expect(author).toEqual(mockAuthor);
      });

      backend.expectOne({
        method: 'GET',
        url: 'http://localhost:3000/api/authors/1'
      }).flush(mockAuthor);
  }));

  it('should get all authors', inject([AuthorsService, HttpTestingController], (service: AuthorsService, backend: HttpTestingController) => {
    const mockAuthors =[{ _id: 1,
      email: "string",
      firstName: "string",
      secondName: "string",
      birthDate: new Date(2011, 0, 1, 2, 3, 4, 567),
      book: [1,2]},
      { _id: 2,
        email: "string",
        firstName: "string",
        secondName: "string",
        birthDate: new Date(2011, 0, 1, 2, 3, 4, 567),
        book: [1,2,3]},
    
    ];

      service.getAuthors().subscribe(authors => {
        expect(authors).toEqual(mockAuthors);
      });

      backend.expectOne({
        method: 'GET',
        url: 'http://localhost:3000/api/authors'
      }).flush(mockAuthors);
  }));

  it('should add author', inject([AuthorsService, HttpTestingController], (service: AuthorsService, backend: HttpTestingController) => {
    const addAuthor = { _id: 1,
      email: "string",
      firstName: "string",
      secondName: "string",
      birthDate: new Date(2011, 0, 1, 2, 3, 4, 567),
      book: [1,2]};

      service.addAuthor(addAuthor).subscribe(author => {
        expect(author).toBe(addAuthor);
      });

      backend.expectOne({
        method: 'POST',
        url:'http://localhost:3000/api/authors/'        
      }).flush(addAuthor);
  }));

  it('should update author', inject([AuthorsService, HttpTestingController], (service: AuthorsService, backend: HttpTestingController) => {
    const addAuthor = { _id: 1,
      email: "string",
      firstName: "string",
      secondName: "string",
      birthDate: new Date(2011, 0, 1, 2, 3, 4, 567),
      book: [1,2]};

      service.updateAuthor(addAuthor).subscribe(author => {
        expect(author).toBe(addAuthor);
      });

      backend.expectOne({
        method: 'PUT',
        url:'http://localhost:3000/api/authors/1'        
      }).flush(addAuthor);
  }));

  it('should delete author', inject([AuthorsService, HttpTestingController], (service: AuthorsService, backend: HttpTestingController) => {
    const addAuthor = { _id: 1,
      email: "string",
      firstName: "string",
      secondName: "string",
      birthDate: new Date(2011, 0, 1, 2, 3, 4, 567),
      book: [1,2]};

      service.deleteAuthor(1).subscribe(author => {
        expect(author).toEqual(addAuthor);
      });

      backend.expectOne({
        method: 'DELETE',
        url:'http://localhost:3000/api/authors/1'        
      }).flush(addAuthor);
  }));

});
