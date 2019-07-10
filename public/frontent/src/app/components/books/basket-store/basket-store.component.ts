import { Component, Input, OnInit } from '@angular/core';
import { BasketService } from '../../../services/basket.service';
import { Router } from '@angular/router';
import { AuthorsService } from '../../../services/authors.service';
import { Author } from '../../../models/author.model';

import { Book } from '../../../models/book.model';
import { UserService } from '../../../services/user.service'
import { User } from '../../../models/user.model';

@Component({
  selector: 'app-basket-store',
  templateUrl: './basket-store.component.html',
  styleUrls: ['./basket-store.component.css'],
})
export class BasketStoreComponent implements OnInit {
  authors: Author[] = [];
  books: Book[] = [];
  user: User;
  bookAuthors: Author[] = [];
  
  constructor(public userService: UserService,
    private basketService: BasketService,
    private authorService: AuthorsService) { }

  ngOnInit() {
    this.getBooks();

    
    this.user = userList;
    // console.log(this.getUserData());
    // for (let i = 0; i < localStorage.length; i++){
    //   let key = localStorage.key(i);
    //   let value = localStorage.getItem(key);
    //   console.log(key, value);
    // }


  }

  setDataEmail(){
    alert (' Ваша заявка на оформление заказа отправлена, ждите ответ на почте!');
    console.log(this.user);
    this.userService.addUserEmail(this.user);
    localStorage.clear();
  } 
  // getUserData(){
    
  // this.user.email =  ;
  // //  this.user.books = [];
  //   return this.user.email;
  // }
  // getUserData (){
  // }

  getBooks() {
    this.books = this.basketService.getBooks();
    //   console.log(this.sum);
  }

  getImagePath(imageId: String) {
    return imageId ? 'http://localhost:3000/api/books/image/' + imageId : 'https://material.angular.io/assets/img/examples/shiba1.jpg';
  }

}
const userList: User = {
  price: 120,
  email: "dlkjsdlkfjdslkf",
  books:[]
}