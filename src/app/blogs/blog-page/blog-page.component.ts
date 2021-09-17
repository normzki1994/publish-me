import { Component, OnInit } from '@angular/core';

import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { BlogService } from '../blog.service';

@Component({
  selector: 'app-blog-page',
  templateUrl: './blog-page.component.html',
  styleUrls: ['./blog-page.component.css']
})
export class BlogPageComponent implements OnInit {
  faSearch = faSearch;
  
  blogs: any = [];

  currentPage: number = 1;
  pageSize: number = 6;
  lastPage: number = 1;

  isLoading: boolean = false;
  modalType: string | null = null;
  modalMessage: string | null = null;

  constructor(private blogService: BlogService) { }

  ngOnInit(): void {
    this.loadBlogs("");
  }

  onSearch(searchText: string) {
    this.currentPage = 1;
    this.loadBlogs(searchText);
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
