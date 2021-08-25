import { Component, OnInit } from '@angular/core';
import { faShoppingCart, faSearch } from '@fortawesome/free-solid-svg-icons';

import { Book } from '../book.model';

@Component({
  selector: 'app-books-page',
  templateUrl: './books-page.component.html',
  styleUrls: ['./books-page.component.css']
})
export class BooksPageComponent implements OnInit {
  faShoppingCart = faShoppingCart;
  faSearch = faSearch;
  
  books: Book[] = [
    { title: "Cindrella", author: "Jenny Amy", price: 20, genre: "Children's Story", bookCover: "book-cover.jpg" },
    { title: "Frozen: Let It Go", author: "Jenny Amy", price: 20, genre: "Children's Story", bookCover: "book-cover-2.jpg" },
    { title: "Basic Algebra", author: "John Play", price: 20, genre: "Education", bookCover: "book-cover-3.jpg" },
    { title: "Biology and Chemistry", author: "Mark Sunder", price: 20, genre: "Education", bookCover: "book-cover-4.jpg" },
    { title: "Programming Fundamentals", author: "Jenny Amy", price: 20, genre: "Education", bookCover: "book-cover.jpg" },
    { title: "Spaghetti Recipe", author: "Jenny Amy", price: 20, genre: "Cooking", bookCover: "book-cover-2.jpg" },
    { title: "Caligraphy", author: "John Play", price: 20, genre: "Art", bookCover: "book-cover-3.jpg" },
    { title: "Titanic", author: "Mark Sunder", price: 20, genre: "Romance", bookCover: "book-cover-4.jpg" },
    { title: "Accounting", author: "Jenny Amy", price: 20, genre: "Business", bookCover: "book-cover.jpg" }
    // { title: "Finance", author: "Jenny Amy", price: 20, genre: "Business", bookCover: "book-cover-2.jpg" },
    // { title: "Daily Exercise", author: "John Play", price: 20, genre: "Lifestyle", bookCover: "book-cover-3.jpg" },
    // { title: "Furniture Making", author: "Mark Sunder", price: 20, genre: "Lifestyle", bookCover: "book-cover-4.jpg" }
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
