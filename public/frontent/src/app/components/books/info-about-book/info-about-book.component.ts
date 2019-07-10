import { Component, OnInit } from '@angular/core';
import { BookService } from '../../../services/book.service';
import { BasketService } from '../../../services/basket.service';
import { Book } from '../../../models/book.model';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from "rxjs/operators";
import { of } from "rxjs";
import { AuthorsService } from '../../../services/authors.service';
import { Author } from '../../../models/author.model';

@Component({
  selector: 'app-info-about-book',
  templateUrl: './info-about-book.component.html',
  styleUrls: ['./info-about-book.component.css']
})
export class InfoAboutBookComponent implements OnInit {
  bookOne: Book;
  
  authors: Author[] = [];
  filteredAuthors: Author[];
  bookAuthors: Author[] = [];


  constructor(private booksService: BookService,
    public basketService: BasketService,
    private authorService: AuthorsService,
    private route: ActivatedRoute,
    private router: Router) { }


  ngOnInit() {
    this.route.paramMap.pipe(switchMap((params: ParamMap) => {
      const id = +params.get("id");
      return this.booksService.getBookById(id);
    })).subscribe((book: Book) => {
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
      this.booksService.getBookById(book._id).subscribe(data => {
        this.bookOne = data;
      });
    });
  }

  getImagePath(imageId: String) {
    return imageId ? 'http://localhost:3000/api/books/image/' + imageId : 'https://material.angular.io/assets/img/examples/shiba1.jpg';
  }

  displayEntity(entity: any) {
    return entity.firstName;
  }
}