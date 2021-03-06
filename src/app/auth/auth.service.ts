import { HttpClient } from "@angular/common/http";
import { Injectable, Input } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Subject, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";

import { User } from "./user.model";

@Injectable({ providedIn: "root" })
export class AuthService {
    @Input() authStatusListener = new BehaviorSubject<any>(null);
    @Input() loggedinUser: any = null;
    @Input() token: string = "";
    @Input() private tokeExpirationTimer: any;
    
    constructor(private http: HttpClient, private router: Router) {

    }

    signup(name: string, email: string, password: string, image: File) {
        var userData = new FormData();
        userData.append("name", name);
        userData.append("email", email);
        userData.append("password", password);
        userData.append("image", image);

        return this.http.post("http://localhost:3000/api/users/signup", userData);
    }

    login(email: string, password: string) {
        return this.http.post<{
            token: string; 
            expiresIn: number; 
            name: string; 
            email: string;
            userId: string;
            isAdmin: boolean;
            imagePath: string
        }>("http://localhost:3000/api/users/login", { email: email, password: password});
    }

    logout() {
        this.authStatusListener.next(null);
        this.router.navigate(["/login"]);
        localStorage.removeItem("userData");

        if(this.tokeExpirationTimer) {
            clearTimeout(this.tokeExpirationTimer);
        }
        this.tokeExpirationTimer = null;
    }

    autoLogout(expirationDuration: number) {
        this.tokeExpirationTimer = setTimeout(() => {
            this.logout();
        }, expirationDuration);
    }

    autoLogin() {
        const user = JSON.parse(localStorage.getItem("userData") || "{}");

        if(!user) {
            return;
        }

        if(user.token) {
            this.authStatusListener.next(user);
            this.autoLogout(user.expiresIn * 1000);
        }
    }
}