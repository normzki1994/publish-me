import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { isImageValidator } from "../../validators/is-image.validator"
import { BlogService } from '../blog.service';

@Component({
  selector: 'app-add-blog',
  templateUrl: './add-blog.component.html',
  styleUrls: ['./add-blog.component.css']
})
export class AddBlogComponent implements OnInit {
  blogForm: FormGroup = new FormGroup({
    title: new FormControl("", [Validators.required, Validators.minLength(2), Validators.maxLength(150)]),
    description: new FormControl("", [Validators.required, Validators.minLength(10), Validators.maxLength(400)]),
    image: new FormControl("", [Validators.required, isImageValidator()]),
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

  constructor(private blogService: BlogService, private router: Router) { }

  ngOnInit(): void {
  }

  onImagePicked(event: Event) {
    this.blogForm.get("image")?.markAsTouched();
    this.blogForm.get("image")?.markAsDirty();

    const file = (<HTMLInputElement>event.target).files;
    var myImage: any;
    if(file) {
        myImage = file[0];
    } else {
      return;
    }

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

  onSubmit() {
    this.isLoading = true;
    this.blogService.addBlog(this.title?.value, this.image?.value, this.description?.value, this.date?.value)
      .subscribe(responseData => {
        this.isLoading = false;
        this.router.navigate(["/admin/blogs"]);
      }, error => {
        console.log(error);
        this.isLoading = false;
        this.modalType = "Error";
        this.modalMessage = "Something went wrong";
      })
  }
}
