import { Component, OnInit } from '@angular/core';
import { AuthorsService } from 'itools-candidate-test/public/TestAngular/src/app/services/authors.service';
import { Router } from '@angular/router';

import { Author } from '../../models/author.model';


@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.css']
})
export class AuthorComponent implements OnInit {

  authors: Author[];
  displayedColumns = ['_id', 'email', 'firstName', 'secondName', 'birthDate', 'book', 'actions'];

  constructor(private authorsService: AuthorsService, private router: Router) {

  }


  ngOnInit() {

    this.fetchAuthors();

  }

  fetchAuthors() {

    this.authorsService
      .getAuthors()
      .subscribe(data => {
        this.authors = data;
        console.log('Data requested ... ');
        console.log(this.authors);
      });

  }

  editAuthors(_id) {
    this.router.navigate([`/author/${_id}`]);
  }

  deleteAuthors(_id) {
    this.authorsService.deleteAuthor(_id).subscribe(() => {
      this.fetchAuthors();
    });
  }

}
