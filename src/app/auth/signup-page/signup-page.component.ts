import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../auth.service';

import { isImageValidator } from "../../validators/is-image.validator";

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.css']
})
export class SignupPageComponent implements OnInit {
  signupForm: FormGroup = new FormGroup({
    "name": new FormControl("", [Validators.required, Validators.maxLength(150), Validators.minLength(2)]),
    "email": new FormControl("", [Validators.required, Validators.email]),
    "password": new FormControl("", [Validators.required, Validators.maxLength(150), Validators.minLength(2)]),
    "image": new FormControl("", [isImageValidator()])
  });

  get name() { return this.signupForm.get("name") };
  get email() { return this.signupForm.get("email") };
  get password() { return this.signupForm.get("password") };
  get image() { return this.signupForm.get("image") };

  isLoading: boolean = false;
  modalType: string | null = null;
  modalMessage: string | null = null;

  imagePreview: any = null;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit() {
    if(!this.signupForm.valid) {
      return;
    }

    const name = this.signupForm.get("name")?.value;
    const email = this.signupForm.get("email")?.value;
    const password = this.signupForm.get("password")?.value;
    const image = this.signupForm.get("image")?.value;

    this.isLoading = true;
    this.authService.signup(name, email, password, image).subscribe(responseData => {
      console.log(responseData);
      this.isLoading = false;
      // this.router.navigate(["/admin"]);
      this.modalType = "Info";
      this.modalMessage = "You successfully sign up";
      this.signupForm.reset();
      this.imagePreview = null;
    }, error => {
      console.log(error);
      this.isLoading = false;
      this.modalType = "Error";
      this.modalMessage = error.statusText;
      window.scroll(0,0,);
    });
  }

  onImagePicked(event: Event) {
    this.signupForm.get("image")?.markAsTouched();
    this.signupForm.get("image")?.markAsDirty();

    const file = (<HTMLInputElement>event.target).files;
    var myImage: any;
    if(file) {
        myImage = file[0];
    } else {
      return;
    }

    this.signupForm.patchValue({image: myImage});
    this.signupForm.get("image")?.updateValueAndValidity();

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
