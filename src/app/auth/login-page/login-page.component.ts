import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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

  constructor(private authService: AuthService, private router: Router) { }

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
      this.isLoading = false;
      this.authService.token = responseData.token;
      const fetchedUser: any = {
        email: responseData.email,
        name: responseData.name,
        userId: responseData.userId,
        isAdmin: responseData.isAdmin,
        imagePath: responseData.imagePath
      }
      this.authService.loggedinUser = fetchedUser;
      this.authService.authStatusListener.next(fetchedUser);
      localStorage.setItem("userData", JSON.stringify(responseData));
      this.authService.autoLogout(responseData.expiresIn * 1000);
      this.router.navigate(["/"]);
    }, errorMessage => {
      this.isLoading = false;
      this.modalType = "Error";
      this.modalMessage = errorMessage.statusText;
    });
  }
}
