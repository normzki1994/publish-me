import { HttpClient } from "@angular/common/http";
import { Injectable, Input } from "@angular/core";
import { Router } from "@angular/router";

@Injectable({ providedIn: "root" })
export class MessageService {
    
    constructor(private http: HttpClient, private router: Router) {

    }

    addMessage(name: string, email: string, subject: string, message: string) {
        var messageData = {
            name: name,
            email: email,
            subject: subject,
            message: message,
        };

        return this.http.post("http://localhost:3000/api/messages/", messageData);
    }

    getMessages(pageSize: any, currentPage: any, searchText: string) {
        let token;
        const userData = localStorage.getItem("userData");
        if(userData) {
            token = JSON.parse(userData)?.token;
        }

        return this.http.get<{messages: any, lastPage: number}>("http://localhost:3000/api/messages/", {
            params: {
                pageSize: pageSize,
                currentPage: currentPage,
                searchText: searchText,
                token: token
            }
        });
    }

    getMessage(messageId: any) {
        let token;
        const userData = localStorage.getItem("userData");
        if(userData) {
            token = JSON.parse(userData)?.token;
        }

        return this.http.get("http://localhost:3000/api/messages/" + messageId, {
            params: {
                token: token
            }
        });
    }
}