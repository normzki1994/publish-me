import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.css']
})
export class SignupPageComponent implements OnInit {
  signupForm: FormGroup = new FormGroup({
    "name": new FormControl("", [Validators.required, Validators.maxLength(150), Validators.minLength(2)]),
    "email": new FormControl("", [Validators.required, Validators.email]),
    "password": new FormControl("", [Validators.required, Validators.maxLength(150), Validators.minLength(2)])
  });

  get name() { return this.signupForm.get("name") };
  get email() { return this.signupForm.get("email") };
  get password() { return this.signupForm.get("password") };

  isLoading: boolean = false;
  modalType: string | null = null;
  modalMessage: string | null = null;

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

    this.isLoading = true;
    this.authService.signup(name, email, password).subscribe(responseData => {
      console.log(responseData);
      this.isLoading = false;
      // this.router.navigate(["/admin"]);
      this.modalType = "Info";
      this.modalMessage = "You successfully sign up";
    }, error => {
      console.log(error);
      this.isLoading = false;
      this.modalType = "Error";
      this.modalMessage = error.statusText;
      window.scroll(0,0,);
    });
  }
}
