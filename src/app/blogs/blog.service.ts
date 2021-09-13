import { HttpClient } from "@angular/common/http";
import { Injectable, Input } from "@angular/core";
import { Router } from "@angular/router";

@Injectable({ providedIn: "root" })
export class BlogService {
    
    constructor(private http: HttpClient, private router: Router) {

    }

    addBlog(title: string, image: File, description: string, date: Date) {
        let token;
        const userData = localStorage.getItem("userData");
        if(userData) {
            token = JSON.parse(userData)?.token;
        }

        const blogData = new FormData();
        blogData.append("title", title);
        blogData.append("image", image);
        blogData.append("description", description);
        blogData.append("date", date.toString());
        return this.http.post("http://localhost:3000/api/blogs/", blogData, {
            params: {
                token: token
            }
        });
    }
}