import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { AuthorService } from '../author.service';

@Component({
  selector: 'app-admin-author-page',
  templateUrl: './admin-author-page.component.html',
  styleUrls: ['./admin-author-page.component.css']
})
export class AdminAuthorPageComponent implements OnInit {
  faSearch = faSearch;

  authors: any = [];

  currentPage: number = 1;
  pageSize: number = 9;
  lastPage: number = 1;

  isLoading: boolean = false;
  modalType: string | null = null;
  modalMessage: string | null = null;

  constructor(private authorService: AuthorService, private router: Router) { }

  ngOnInit(): void {
    this.loadAuthors("");
  }

  onSearch(searchText: string) {
    this.currentPage = 1;
    this.loadAuthors(searchText);
  }

  onPrevious(searchText: string) {
    if(this.currentPage == 1) {
      return;
    }

    this.currentPage = this.currentPage - 1;
    this.loadAuthors(searchText);
  }

  onNext(searchText: string) {
    if(this.currentPage >= this.lastPage) {
      return;
    }

    this.currentPage = this.currentPage + 1;
    this.loadAuthors(searchText);
  }

  loadAuthors(searchText: string) {
    this.isLoading = true;
    window.scroll(0, 0);
    this.authorService.getAuthors(this.pageSize, this.currentPage, searchText).subscribe(response => {
      this.isLoading = false;
      this.authors = response.authors;
      this.lastPage = response.lastPage;
    }, error => {
      this.isLoading = false;
      this.modalType = "Error";
      this.modalMessage = error.statusText;
    });
  }

  onDelete(authorId: any) {
    this.isLoading = true;

    this.authorService.deleteAuthor(authorId).subscribe(response => {
      this.isLoading = false;
      this.currentPage = 1;
      this.loadAuthors("");
    }, error => {
      this.isLoading = false;
      this.modalType = "Error";
      this.modalMessage = "Something went wrong";
    });
  }
}
