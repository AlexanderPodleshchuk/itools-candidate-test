import { Component } from '@angular/core';
import { BasketService } from './services/basket.service';
import { Book } from './models/book.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'BookStore';
  books: Book[] = [];
  constructor (public basketService: BasketService, private router : Router){ }


}
