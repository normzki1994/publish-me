import { HttpClient } from "@angular/common/http";
import { Injectable, Input } from "@angular/core";
import { Router } from "@angular/router";

@Injectable({ providedIn: "root" })
export class CommentService {
    
    constructor(private http: HttpClient, private router: Router) {

    }

    addComment(content: string, blogId: any) {
        let userId;
        let token;
        const userData = localStorage.getItem("userData");
        if(userData) {
            userId = JSON.parse(userData)?.userId;
            token = JSON.parse(userData)?.token;
        }

        const commentData = {
            userId: userId,
            content: content,
            blogId: blogId
        };

        return this.http.post("http://localhost:3000/api/comments/", commentData, {
            params: {
                token: token
            }
        });
    }
}