import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AboutPageComponent } from "./about-page/about-page.component";
import { AdminPortalLoginPageComponent } from "./auth/admin-portal-login-page/admin-portal-login-page.component";
import { AuthorPageComponent } from "./authors/author-page/author-page.component";
import { BlogPageComponent } from "./blogs/blog-page/blog-page.component";
import { BooksPageComponent } from "./books/books-page/books-page.component";
import { ContactUsPageComponent } from "./contact-us-page/contact-us-page.component";

import { HomePageComponent } from "./home-page/home-page.component";

const routes: Routes = [
    { path: "", component: HomePageComponent },
    { path: "about", component: AboutPageComponent },
    { path: "books", component: BooksPageComponent },
    { path: "authors", component: AuthorPageComponent },
    { path: "blogs", component: BlogPageComponent },
    { path: "contact-us", component: ContactUsPageComponent },
    { path: "auth", component: AdminPortalLoginPageComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: "enabled" })],
    exports: [RouterModule]
})
export class AppRoutingModule {

}