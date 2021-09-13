import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { BookService } from '../book.service';

@Component({
  selector: 'app-admin-book-page',
  templateUrl: './admin-book-page.component.html',
  styleUrls: ['./admin-book-page.component.css']
})
export class AdminBookPageComponent implements OnInit {
  faSearch = faSearch;

  books: any = [];

  currentPage: number = 1;
  pageSize: number = 6;
  lastPage: number = 1;

  isLoading: boolean = false;
  modalType: string | null = null;
  modalMessage: string | null = null;

  constructor(private bookService: BookService, private router: Router) { }

  ngOnInit(): void {
    this.loadBooks("");
  }

  onSearch(searchText: string) {
    this.currentPage = 1;
    this.loadBooks(searchText);
  }

  onDelete(booksId: any) {
    // this.isLoading = true;

    // this.bookService.deleteAuthor(authorId).subscribe(response => {
    //   this.isLoading = false;
    //   this.currentPage = 1;
    //   this.loadAuthors("");
    // }, error => {
    //   this.isLoading = false;
    //   this.modalType = "Error";
    //   this.modalMessage = "Something went wrong";
    // });
  }

  loadBooks(searchText: string) {
    this.isLoading = true;
    window.scroll(0, 0);
    this.bookService.getBooks(this.pageSize, this.currentPage, searchText).subscribe(response => {
      this.isLoading = false;
      this.books = response.books;
      this.lastPage = response.lastPage;
    }, error => {
      this.isLoading = false;
      this.modalType = "Error";
      this.modalMessage = error.statusText;
    });
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
}
