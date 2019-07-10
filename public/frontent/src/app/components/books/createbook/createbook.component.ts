import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { BookService } from '../../../services/book.service';
import { switchMap } from "rxjs/operators";
import { of } from "rxjs";
import { Book } from "../../../models/book.model";
import { AuthorsService } from '../../../services/authors.service';
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

  bookMainImage: File;

  imageId: String;

  constructor(private booksService: BookService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private authorService: AuthorsService) {
  }

  saveBook() {
    const book = this.getBook();
    this.booksService.uploadImage(this.bookMainImage).subscribe(res => {
      book.mainImage = res;
      if (this.mode === "Add") {
        this.booksService.addBook(book).subscribe(() => {
          this.router.navigate(['/books']);
        });
      } else {
        this.booksService.updateBook(book).subscribe(() => {
          this.router.navigate(['/books']);
        });
      }
    });
  }

  getBook() {
    const book = <Book>{};

    book._id = this.createForm.get("id").value;
    book.name = this.createForm.get("name").value;
    book.pages = this.createForm.get("pages").value;
    book.year = this.createForm.get("year").value;
    book.price = this.createForm.get("price").value;
    book.descriptionBook = this.createForm.get("descriptionBook").value;
    book.author = this.getAuthorsIds();

    return book;

  }

  createFormGroup(book: Book) {
    this.createForm = new FormGroup({
      id: new FormControl(book._id ? book._id : '', Validators.required),
      name: new FormControl(book.name ? book.name : '', [Validators.required, Validators.minLength(3)]),
      pages: new FormControl(book.pages ? book.pages : '', Validators.required),
      year: new FormControl(book.year ? book.year : '', Validators.required),
      price: new FormControl(book.price ? book.price : '', Validators.required),
      descriptionBook: new FormControl(book.descriptionBook ? book.descriptionBook : '', Validators.required),
      author: new FormControl(book.author ? book.author : '', Validators.required)
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

  imageChanged(fileInput: any) {
    this.bookMainImage = fileInput.target.files[0];
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
      if (book.mainImage) {
        this.imageId = book.mainImage;
      }
      book.author.forEach(id => {
        this.authorService.getAuthorById(id).subscribe(author => {
          if (author) {
            this.bookAuthors.push(author);
          }
        });
      });
    });
  }

  getImagePath() {
    return 'http://localhost:3000/api/books/image/' + this.imageId;
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
