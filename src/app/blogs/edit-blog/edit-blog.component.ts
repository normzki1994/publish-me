import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

import { isImageValidator } from "../../validators/is-image.validator"
import { BlogService } from '../blog.service';

@Component({
  selector: 'app-edit-blog',
  templateUrl: './edit-blog.component.html',
  styleUrls: ['./edit-blog.component.css']
})
export class EditBlogComponent implements OnInit {
  blogForm: FormGroup = new FormGroup({
    title: new FormControl("", [Validators.required, Validators.minLength(2), Validators.maxLength(150)]),
    description: new FormControl("", [Validators.required, Validators.minLength(10), Validators.maxLength(400)]),
    image: new FormControl(""),
    date: new FormControl(null, [Validators.required])
  });

  get title() { return this.blogForm.get("title") };
  get image() { return this.blogForm.get("image") };
  get description() { return this.blogForm.get("description") };
  get date() { return this.blogForm.get("date") };

  imagePreview: any = null;

  isLoading: boolean = false;
  modalType: string | null = null;
  modalMessage: string | null = null;

  blogId: any = null;

  constructor(private blogService: BlogService, private router: Router, private route: ActivatedRoute) { 

  }

  ngOnInit(): void {
    this.isLoading = true;
    this.route.paramMap.subscribe((param: ParamMap) => {
      var blogId = param.get("id");
      this.blogId = blogId;

      this.blogService.getBlog(blogId).subscribe(blog => {
        this.isLoading = false;
        if(blog) {
          this.imagePreview = blog.imagePath;
          var imageFromImgTag = null;
          
          var xhr = new XMLHttpRequest();
          xhr.open("GET", blog.imagePath, true); 
          xhr.responseType = "blob";
          xhr.onload = function (e) {
            imageFromImgTag = this.response;
          };
          xhr.send();
          this.blogForm.setValue({ title: blog.title, description: blog.description, image: imageFromImgTag, 
            date: new Date(blog.date).toISOString().split('T')[0] });
        }
      }, error => {
        this.isLoading = false;
        this.modalType = "Error";
        this.modalMessage = "Something went wrong";
      })
    })
  }

  onSubmit() {
    this.isLoading = true;
    this.blogService
      .updateBlog(this.blogId, this.title?.value, this.image?.value, this.description?.value, this.date?.value)
      .subscribe(response => {
        this.isLoading = false;
        this.router.navigate(["/admin/blogs"]);
      }, error => {
        this.isLoading = false;
        this.modalType = "Error";
        this.modalMessage = "Something went wrong";
      });
  }

  onImagePicked(event: Event) {
    this.blogForm.get("image")?.markAsTouched();
    this.blogForm.get("image")?.markAsDirty();

    this.getImageFile(event);
  }

  getImageFile(event: Event) {
    const file = (<HTMLInputElement>event.target).files;
    var myImage: any;
    if(file) {
        myImage = file[0];
    } else {
      return;
    }

    this.blogForm.get("image")?.addValidators(isImageValidator());
    this.blogForm.patchValue({image: myImage});
    this.blogForm.get("image")?.updateValueAndValidity();

    const validImageType = ["image/jpg", "image/jpeg", "image/png"];
    if(!validImageType.includes(myImage.type)) {
      return;
    }
    
    const reader = new FileReader();
    reader.onload = () => {
        this.imagePreview = reader.result;
    };
    reader.readAsDataURL(myImage);
  }
}
