import { Component, OnInit } from '@angular/core';
import { faShoppingCart, faSearch } from '@fortawesome/free-solid-svg-icons';

import { Book } from '../book.model';
import { BookService } from '../book.service';

@Component({
  selector: 'app-books-page',
  templateUrl: './books-page.component.html',
  styleUrls: ['./books-page.component.css']
})
export class BooksPageComponent implements OnInit {
  faShoppingCart = faShoppingCart;
  faSearch = faSearch;

  currentPage: number = 1;
  pageSize: number = 6;
  lastPage: number = 1;

  books: any = [];

  isLoading: boolean = false;
  modalType: string = "";
  modalMessage: string = "";

  constructor(private bookService: BookService) { }

  ngOnInit(): void {
    this.loadBooks("");
  }

  onSearch(searchText: string) {
    this.currentPage = 1;
    this.loadBooks(searchText);
  }

  onPrevious(searchText: string) {
    if(this.currentPage == 1) {
      return;
    }

    this.currentPage = this.currentPage - 1;
    this.loadBooks(searchText);
  }

  onNext(searchText: string) {
    if(this.currentPage >= this.lastPage) {
      return;
    }

    this.currentPage = this.currentPage + 1;
    this.loadBooks(searchText);
  }

  loadBooks(searchText: string) {
    window.scroll(0, 0);
    this.isLoading = true;
    this.bookService.getBooks(this.pageSize, this.currentPage, searchText).subscribe(response => {
      this.isLoading = false;
      this.books = response.books;
      this.lastPage = response.lastPage;
    }, error => {
      this.isLoading = false;
      this.modalType = "Error";
      this.modalMessage = "Something went wrong";
    });
  }
}
