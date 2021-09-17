import { HttpClient } from "@angular/common/http";
import { Injectable, Input } from "@angular/core";
import { Router } from "@angular/router";
import { Blog } from "./blog.model";

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

    getBlogs(pageSize: any, currentPage: any, searchText: string) {
        return this.http.get<{blogs: any, lastPage: number}>("http://localhost:3000/api/blogs/", {
            params: {
                pageSize: pageSize,
                currentPage: currentPage,
                searchText: searchText
            }
        });
    }

    getBlog(blogId: any) {
        return this.http.get<any>("http://localhost:3000/api/blogs/" + blogId);
    }

    updateBlog(blogId: any, title: string, image: File, description: string, date: Date) {
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

        return this.http.put("http://localhost:3000/api/blogs/" + blogId, blogData, {
            params: {
                token: token
            }
        });
    }

    deleteBlog(blogId: any) {
        let token;
        const userData = localStorage.getItem("userData");
        if(userData) {
            token = JSON.parse(userData)?.token;
        }

        return this.http.delete("http://localhost:3000/api/blogs/" + blogId, {
            params: {
                token: token
            }
        });
    }
}