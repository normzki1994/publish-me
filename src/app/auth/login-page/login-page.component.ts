import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({
    "email": new FormControl("", [Validators.required, Validators.email]),
    "password": new FormControl("", [Validators.required, Validators.maxLength(150), Validators.minLength(2)])
  });

  get email() { return this.loginForm.get("email") };
  get password() { return this.loginForm.get("password") };

  isLoading: boolean = false;
  modalType: string | null = null;
  modalMessage: string | null = null;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    if(!this.loginForm.valid) {
      return;
    }

    const email = this.loginForm.get("email")?.value;
    const password = this.loginForm.get("password")?.value;

    this.isLoading = true;
    this.authService.login(email, password).subscribe(responseData => {
      console.log(responseData);
      this.isLoading = false;
      this.modalType = "Info";
      this.modalMessage = "You successfully sign up";
    }, error => {
      console.log(error);
      this.isLoading = false;
      this.modalType = "Error";
      this.modalMessage = error.statusText;
      window.scroll(0,0,);
    })
  }
}
