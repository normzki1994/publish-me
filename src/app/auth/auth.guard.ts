import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable, Subscription } from "rxjs";

import { AuthService } from "./auth.service";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) {

    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        let isAuth = false;
        this.authService.authStatusListener.subscribe(user => {
            if(!user || user == {}) {
                isAuth = false;
            } else {
                isAuth = true;
            }
        }, error => {
            isAuth = false;
        })

        if(!isAuth) {
            this.router.navigate(["/login"]);
        }
        return isAuth;
    }
}