import { HttpClient } from "@angular/common/http";
import { Injectable, Input } from "@angular/core";
import { Router } from "@angular/router";

@Injectable({ providedIn: "root" })
export class AuthorService {
    
    constructor(private http: HttpClient, private router: Router) {

    }

    addAuthor(name: string, image: File, description: string) {
        let token;
        const userData = localStorage.getItem("userData");
        if(userData) {
            token = JSON.parse(userData)?.token;
        }

        const authorData = new FormData();
        authorData.append("name", name);
        authorData.append("image", image);
        authorData.append("description", description)
        return this.http.post("http://localhost:3000/api/authors/", authorData, {
            params: {
                token: token
            }
        });
    }
}