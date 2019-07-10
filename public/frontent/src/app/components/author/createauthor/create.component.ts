import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { AuthorsService } from '../../../services/authors.service';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Author } from '../../../models/author.model';
import { Book } from '../../../models/book.model';
import { BookService } from '../../../services/book.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateauthorComponent implements OnInit {

  createForm: FormGroup;
  mode = 'Update';

  books: Book[] = [];
  filteredBooks: Book[];
  authorBooks: Book[] = [];

  constructor(private authorsService: AuthorsService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private bookService: BookService) {
  }

  saveAuthor() {
    const author = this.getAuthor();
    if (this.mode === 'Add') {
      this.authorsService.addAuthor(author).subscribe(() => {
        this.router.navigate(['/authors']);
      });
    } else {
      this.authorsService.updateAuthor(author).subscribe(() => {
        this.router.navigate(['/authors']);
      });
    }
  }

  getAuthor() {
    const author = <Author>{};

    author._id = this.createForm.get('id').value;
    author.email = this.createForm.get('email').value;
    author.firstName = this.createForm.get('firstName').value;
    author.secondName = this.createForm.get('secondName').value;
    author.birthDate = this.createForm.get('birthDate').value;
    author.book = this.getBooksIds();

    return author;
  }

  createFormGroup(author: Author) {
    this.createForm = new FormGroup({
      id: new FormControl(author._id ? author._id : '', Validators.required),
      email: new FormControl(author.email ? author.email : '', [Validators.required, Validators.minLength(9)]),
      firstName: new FormControl(author.firstName ? author.firstName : '', [Validators.required, Validators.minLength(3)]),
      secondName: new FormControl(author.secondName ? author.secondName : '', [Validators.required, Validators.minLength(5)]),
      birthDate: new FormControl(author.birthDate ? author.birthDate : '', Validators.required),
      book: new FormControl(author.book ? author.book : '', Validators.required)
    });

    this.createForm.get('book').valueChanges.subscribe(value => {
      if (typeof value === 'string') {
        this.filterBooks(value);
      } else {
        const index = this.authorBooks.findIndex(book => book._id === value._id);
        if (index < 0) {
          this.authorBooks.push(value);
        }
      }
    });
  }

  ngOnInit() {
    this.createFormGroup(<Author>{});
    this.route.paramMap.pipe(switchMap((params: ParamMap) => {
      const id = +params.get('id');
      if (id === -1) {
        this.mode = 'Add';
        return of(<Author>{ book: [] });
      }
      return this.authorsService.getAuthorById(id);
    })).subscribe((author: Author) => {
      this.createFormGroup(author);
      this.bookService.getBooks().subscribe(data => {
        this.books = data;
      });

      author.book.forEach(id => {
        this.bookService.getBookById(id).subscribe(book => {
          if (book) {
            this.authorBooks.push(book);
          }
        });
      });
    });
  }

  onRemoveAuthorBook(id: number) {
    const idx = this.authorBooks.findIndex(book => book._id === id);
    if (idx >= 0) {
      this.authorBooks.splice(idx, 1);
    }
  }

  filterBooks(filter: string) {
    if (!filter) {
      this.filteredBooks = this.books;
      return;
    }
    this.filteredBooks = this.books.filter(book => book.name.includes(filter));
  }

  displayEntity(entity: any) {
    return entity.name;
  }

  getBooksIds() {
    return this.authorBooks.map(book => book._id);
  }

}
