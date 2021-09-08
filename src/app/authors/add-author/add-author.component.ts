import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { isImageValidator } from "../../validators/is-image.validator";
import { AuthorService } from '../author.service';

@Component({
  selector: 'app-add-author',
  templateUrl: './add-author.component.html',
  styleUrls: ['./add-author.component.css']
})
export class AddAuthorComponent implements OnInit {
  authorForm: FormGroup = new FormGroup({
    "name": new FormControl("", [Validators.required, Validators.maxLength(150), Validators.minLength(2)]),
    "image": new FormControl("", [Validators.required, isImageValidator()]),
    "description": new FormControl("", [Validators.required, Validators.maxLength(150), Validators.minLength(10)])
  });

  imagePreview: any = null;

  get name() { return this.authorForm.get("name") };
  get image() { return this.authorForm.get("image") };
  get description() { return this.authorForm.get("description") };

  isLoading: boolean = false;
  modalType: string | null = null;
  modalMessage: string | null = null;

  constructor(private authorService: AuthorService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.isLoading = true;
    this.authorService.addAuthor(this.name?.value, this.image?.value, this.description?.value)
      .subscribe(responseData => {
        this.isLoading = false;
        this.router.navigate(["/admin/authors"]);
      }, error => {
        console.log(error);
        this.isLoading = false;
        this.modalType = "Error";
        this.modalMessage = "Something went wrong";
      })
  }

  onImagePicked(event: Event) {
    this.authorForm.get("image")?.markAsTouched();
    this.authorForm.get("image")?.markAsDirty();

    const file = (<HTMLInputElement>event.target).files;
    var myImage: any;
    if(file) {
        myImage = file[0];
    } else {
      return;
    }

    this.authorForm.patchValue({image: myImage});
    this.authorForm.get("image")?.updateValueAndValidity();

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
