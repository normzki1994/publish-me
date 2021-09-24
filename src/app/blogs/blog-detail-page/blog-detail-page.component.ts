import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { CommentService } from 'src/app/comments/comment.service';
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

  authStatusListenerSubscription: Subscription = new Subscription();
  user: any;

  commentForm: FormGroup = new FormGroup({
    content: new FormControl("", [Validators.required, Validators.maxLength(400)])
  });

  get content() { return this.commentForm.get("content") }

  constructor(private route: ActivatedRoute, private blogService: BlogService, private authService: AuthService,
    private commentSerivce: CommentService) { }

  ngOnInit(): void {
    this.loadBlogs();

    this.isLoading = true;
    this.blogService.getBlogs(3, 1, "").subscribe(response => {
      this.isLoading = false;
      this.recentBlogs = response.blogs;
    }, error => {
      this.isLoading = false;
      this.modalType = "Error";
      this.modalMessage = "Something went wrong";
    });

    this.user = this.authService.loggedinUser;
    this.authStatusListenerSubscription = this.authService.authStatusListener.subscribe(user => {
      this.user = user;
    });
  }

  onTextChanged(comment: any) {
    comment.style.height = "auto";
    comment.style.height = comment.scrollHeight + "px";
  }

  ngOnDestroy() {
    this.authStatusListenerSubscription.unsubscribe();
  }

  onSubmit() {
    this.isLoading = true;
    this.commentSerivce.addComment(this.content?.value, this.blog._id).subscribe(response => {
      this.isLoading = false;
      this.loadBlogs();
    }, error => {
      this.isLoading = false;
      this.modalType = "Error";
      this.modalMessage = "Something went wrong";
    });
  }

  loadBlogs() {
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
}
