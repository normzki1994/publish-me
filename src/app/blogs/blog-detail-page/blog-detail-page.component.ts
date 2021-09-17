import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { BlogService } from '../blog.service';

@Component({
  selector: 'app-blog-detail-page',
  templateUrl: './blog-detail-page.component.html',
  styleUrls: ['./blog-detail-page.component.css']
})
export class BlogDetailPageComponent implements OnInit {
  blog: any = null;
  recentBlogs: any = [];

  isLoading: boolean = false;
  modalType: string | null = null;
  modalMessage: string | null = null;

  constructor(private route: ActivatedRoute, private blogService: BlogService) { }

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

    this.blogService.getBlogs(3, 1, "").subscribe(response => {
      this.recentBlogs = response.blogs;
    });
  }
}
