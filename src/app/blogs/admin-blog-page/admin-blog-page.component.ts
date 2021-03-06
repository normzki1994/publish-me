import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { BlogService } from '../blog.service';

@Component({
  selector: 'app-admin-blog-page',
  templateUrl: './admin-blog-page.component.html',
  styleUrls: ['./admin-blog-page.component.css']
})
export class AdminBlogPageComponent implements OnInit {
  faSearch = faSearch;

  blogs: any = [];

  currentPage: number = 1;
  pageSize: number = 6;
  lastPage: number = 1;

  isLoading: boolean = false;
  modalType: string | null = null;
  modalMessage: string | null = null;

  constructor(private blogService: BlogService, private router: Router) { }

  ngOnInit(): void {
    this.loadBlogs("");
  }

  onSearch(searchText: string) {
    this.currentPage = 1;
    this.loadBlogs(searchText);
  }

  onDelete(blogId: any) {
    this.isLoading = true;
    this.blogService.deleteBlog(blogId).subscribe(response => {
      this.isLoading = false;
      this.currentPage = 1;
      this.loadBlogs("");
    }, error => {
      this.isLoading = false;
      this.modalType = "Error";
      this.modalMessage = error.statusText;
    })
  }

  onPrevious(searchText: string) {
    if(this.currentPage == 1) {
      return;
    }

    this.currentPage = this.currentPage - 1;
    this.loadBlogs(searchText);
  }

  onNext(searchText: string) {
    if(this.currentPage >= this.lastPage) {
      return;
    }

    this.currentPage = this.currentPage + 1;
    this.loadBlogs(searchText);
  }

  loadBlogs(searchText: string) {
    this.isLoading = true;
    window.scroll(0, 0);
    this.blogService.getBlogs(this.pageSize, this.currentPage, searchText).subscribe(response => {
      this.isLoading = false;
      this.blogs = response.blogs;
      this.lastPage = response.lastPage;
    }, error => {
      this.isLoading = false;
      this.modalType = "Error";
      this.modalMessage = error.statusText;
    });
  }
}
