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
}