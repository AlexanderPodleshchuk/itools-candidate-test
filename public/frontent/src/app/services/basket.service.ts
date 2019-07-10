import { Injectable } from '@angular/core';
import { Book } from '../models/book.model';

@Injectable({
	providedIn: 'root'
})
export class BasketService {
	
	private books: Book[] = [];
	sum:number;
	isAdded(book: Book) {
		let key = String(book._id);
		let value = JSON.parse(localStorage.getItem(key));
		return value;
		//return this.books.findIndex(b => b._id === book._id) > -1;
	}

	addBook(book: Book) {
		if (!this.isAdded(book)) {
			this.books.push(book);
		}
		let key = String(book._id);
		localStorage.setItem(key , JSON.stringify(book));
	}

	removeBook(book: Book) {
		const idx = this.books.findIndex(b => b._id === book._id);
		if (idx > -1) {
			this.books.splice(idx, 1);
		}
		let key = String(book._id);
		localStorage.removeItem(key);
				
	}
   
	getBooks(){
		this.sum = 0;
		for (let i = 0; i < localStorage.length; i++){
			   let key = localStorage.key(i);
			   let value =JSON.parse(localStorage.getItem(key));
			   this.books[i] = value;
			   this.sum = this.sum + this.books[i].price;
			}
	return this.books;
	}

    booksLength(){
        return localStorage.length;
    }
}