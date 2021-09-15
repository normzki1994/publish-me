import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { BlogService } from '../blog.service';

@Component({
  selector: 'app-admin-blog-details',
  templateUrl: './admin-blog-details.component.html',
  styleUrls: ['./admin-blog-details.component.css']
})
export class AdminBlogDetailsComponent implements OnInit {
  blog: any = null;

  isLoading: boolean = false;
  modalType: string | null = null;
  modalMessage: string | null = null;

  constructor(private blogService: BlogService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.route.paramMap.subscribe((param: ParamMap) => {
      var blogId = param.get("id");

      this.blogService.getBlog(blogId).subscribe(blog => {
        this.isLoading = false;
        this.blog = blog;
      }, error => {
        this.isLoading = false;
        this.modalType = "Error";
        this.modalMessage = "Something went wrong";
      })
    });
  }

  onDelete(blogId: any) {
    this.isLoading = true;
    this.blogService.deleteBlog(blogId).subscribe(response => {
      this.isLoading = false;
    }, error => {
      this.isLoading = false;
      this.modalType = "Error";
      this.modalMessage = error.statusText;
    })
  }
}
