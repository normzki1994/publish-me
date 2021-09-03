import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Subject } from "rxjs";

import { User } from "./user.model";

@Injectable({ providedIn: "root" })
export class AuthService {
    constructor(private http: HttpClient, private router: Router) {

    }

    signup(name: string, email: string, password: string) {
        const authData: User = { name: name, email: email, password: password, isAdmin: false };
        return this.http.post("http://localhost:3000/api/users/signup", authData);
    }

    login(email: string, password: string) {
        const authData: any = { email: email, password: password };
        return this.http.post<{token: string, expiresIn: number}>("http://localhost:3000/api/users/login", authData);
    }
}