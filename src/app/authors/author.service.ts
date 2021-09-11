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

    getAuthors(pageSize: any, currentPage: any, searchText: string) {
        return this.http.get<{authors: any, lastPage: number}>("http://localhost:3000/api/authors/", {
            params: {
                pageSize: pageSize,
                currentPage: currentPage,
                searchText: searchText
            }
        });
    }

    getAuthor(authorId: any) {
        return this.http.get<any>("http://localhost:3000/api/authors/" + authorId);
    }

    updateAuthor(authorId: any, name: string, image: File, description: string) {
        let token;
        const userData = localStorage.getItem("userData");
        if(userData) {
            token = JSON.parse(userData)?.token;
        }

        const authorData = new FormData();
        authorData.append("name", name);
        authorData.append("description", description);

        if(image) {
            authorData.append("image", image);
        }

        return this.http.put("http://localhost:3000/api/authors/" + authorId, authorData, {
            params: {
                token: token
            }
        });
    }

    deleteAuthor(authorId: any) {
        let token;
        const userData = localStorage.getItem("userData");
        if(userData) {
            token = JSON.parse(userData)?.token;
        };

        return this.http.delete("http://localhost:3000/api/authors/" + authorId, {
            params: {
                token: token
            }
        });
    }

    getAllAuthors() {
        return this.http.get<{authors: any, lastPage: number}>("http://localhost:3000/api/authors/all");
    }
}