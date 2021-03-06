import { HttpClient } from "@angular/common/http";
import { Injectable, Input } from "@angular/core";
import { Router } from "@angular/router";

@Injectable({ providedIn: "root" })
export class BookService {
    
    constructor(private http: HttpClient, private router: Router) {

    }

    addBook(title: string, image: File, author: string, price: number, genre: string, datePublished: Date) {
        let token;
        const userData = localStorage.getItem("userData");
        if(userData) {
            token = JSON.parse(userData)?.token;
        }

        const bookData = new FormData();
        bookData.append("title", title);
        bookData.append("image", image);
        bookData.append("author", author);
        bookData.append("price", price.toString());
        bookData.append("genre", genre);
        bookData.append("datePublished", datePublished.toString());
        return this.http.post("http://localhost:3000/api/books/", bookData, {
            params: {
                token: token
            }
        });
    }

    getBooks(pageSize: any, currentPage: any, searchText: string) {
        return this.http.get<{books: any, lastPage: number}>("http://localhost:3000/api/books/", {
            params: {
                pageSize: pageSize,
                currentPage: currentPage,
                searchText: searchText
            }
        });
    }

    getBook(bookId: any) {
        return this.http.get<any>("http://localhost:3000/api/books/" + bookId);
    }

    updateBook(bookId: any, title: string, image: File, author: string, price: number, genre: string, datePublished: Date) {
        let token;
        const userData = localStorage.getItem("userData");
        if(userData) {
            token = JSON.parse(userData)?.token;
        }

        const bookData = new FormData();
        bookData.append("title", title);
        bookData.append("image", image);
        bookData.append("author", author);
        bookData.append("price", price.toString());
        bookData.append("genre", genre);
        bookData.append("datePublished", datePublished.toString());
        return this.http.put("http://localhost:3000/api/books/" + bookId, bookData, {
            params: {
                token: token
            }
        });
    }

    deleteBook(bookId: any) {
        let token;
        const userData = localStorage.getItem("userData");
        if(userData) {
            token = JSON.parse(userData)?.token;
        }

        return this.http.delete("http://localhost:3000/api/books/" + bookId, {
            params: {
                token: token
            }
        });
    }
}