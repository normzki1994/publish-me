import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable, Subscription } from "rxjs";

import { AuthService } from "./auth.service";

@Injectable()
export class AuthAdminGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) {

    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        let isAdmin = false;
        this.authService.authStatusListener.subscribe(user => {
            if(!user || user == {}) {
                isAdmin = false;
            } else {
                if(user.isAdmin == true) {
                    isAdmin = true;
                } else {
                    isAdmin = false;
                }
            }
        }, error => {
            isAdmin = false;
        })

        if(!isAdmin) {
            this.router.navigate(["/"]);
        }
        return isAdmin;
    }
}