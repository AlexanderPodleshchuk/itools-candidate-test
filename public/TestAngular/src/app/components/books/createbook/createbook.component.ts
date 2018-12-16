import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { BookService } from 'itools-candidate-test/public/TestAngular/src/app/services/book.service';
import { switchMap } from "rxjs/operators";
import { of } from "rxjs";
import { Book } from "../../../models/book.model";
import { AuthorsService } from 'itools-candidate-test/public/TestAngular/src/app/services/authors.service';
import { Author } from '../../../models/author.model';

@Component({
  selector: 'app-createbook',
  templateUrl: './createbook.component.html',
  styleUrls: ['./createbook.component.css']
})
export class CreatebookComponent implements OnInit {

  createForm: FormGroup;
  mode = "Update";

  authors: Author[] = [];
  filteredAuthors: Author[];
  bookAuthors: Author[] = [];

  constructor(private booksService: BookService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private authorService: AuthorsService) {
  }

  saveBook() {
    const book = this.getBook();
    if (this.mode === "Add") {
      this.booksService.addBook(book).subscribe(() => {
        this.router.navigate(['/books']);
      });
    } else {
      this.booksService.updateBook(book).subscribe(() => {
        this.router.navigate(['/books']);
      });
    }
  }

  getBook() {
    const book = <Book>{};

    book._id = this.createForm.get("id").value;
    book.name = this.createForm.get("name").value;
    book.pages = this.createForm.get("pages").value;
    book.isbn = this.createForm.get("isbn").value;
    book.year = this.createForm.get("year").value;
    book.ebook = this.createForm.get("ebook").value;
    book.publishing = this.createForm.get("publishing").value;
    book.author = this.getAuthorsIds();

    return book;

  }

  createFormGroup(book: Book) {
    this.createForm = new FormGroup({
      id: new FormControl(book._id ? book._id : '', Validators.required),
      name: new FormControl(book.name ? book.name : ''),
      pages: new FormControl(book.pages ? book.pages : ''),
      isbn: new FormControl(book.isbn ? book.isbn : ''),
      year: new FormControl(book.year ? book.year : ''),
      ebook: new FormControl(book.ebook ? book.ebook : ''),
      publishing: new FormControl(book.publishing ? book.publishing : ''),
      author: new FormControl(book.author ? book.author : '')
    });


    this.createForm.get('author').valueChanges.subscribe(value => {
      if (typeof value === 'string') {
        this.filterAuthors(value);
      } else {
        const index = this.bookAuthors.findIndex(book => book._id === value._id);
        if (index < 0) {
          this.bookAuthors.push(value);
        }
      }
    });
  }
  ngOnInit() {
    this.createFormGroup(<Book>{});
    this.route.paramMap.pipe(switchMap((params: ParamMap) => {
      const id = +params.get("id");
      if (id === -1) {
        this.mode = "Add";
        return of(<Book>{ author: [] });
      }
      return this.booksService.getBookById(id);
    })).subscribe((book: Book) => {
      this.createFormGroup(book);
      this.authorService.getAuthors().subscribe(data => {
        this.authors = data;
      });
      book.author.forEach(id => {
        this.authorService.getAuthorById(id).subscribe(author => {
          if (author) {
            this.bookAuthors.push(author);
          }
        });
      });
    });
  }

  onRemoveBookAuthor(id: number) {
    const idx = this.bookAuthors.findIndex(author => author._id === id);
    if (idx >= 0) {
      this.bookAuthors.splice(idx, 1);
    }
  }

  filterAuthors(filter: string) {
    if (!filter) {
      this.filteredAuthors = this.authors;
      return;
    }
    this.filteredAuthors = this.authors.filter(author => author.firstName.includes(filter) || author.secondName.includes(filter));
  }

  displayEntity(entity: any) {
    return entity.firstName;
  }

  getAuthorsIds() {
    return this.bookAuthors.map(author => author._id);
  }

}
