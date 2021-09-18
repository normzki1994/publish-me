import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AuthGuard } from "./auth/auth.guard";
import { AuthAdminGuard } from "./auth/auth-admin.guard";

import { HomePageComponent } from "./home-page/home-page.component";
import { AboutPageComponent } from "./about-page/about-page.component";
import { AdminPortalComponent } from "./admin/admin-portal/admin-portal.component";
import { LoginPageComponent } from "./auth/login-page/login-page.component";
import { SignupPageComponent } from "./auth/signup-page/signup-page.component";
import { AuthorPageComponent } from "./authors/author-page/author-page.component";
import { BlogPageComponent } from "./blogs/blog-page/blog-page.component";
import { BooksPageComponent } from "./books/books-page/books-page.component";
import { ContactUsPageComponent } from "./contact-us-page/contact-us-page.component";
import { AdminPageComponent } from "./admin/admin-page/admin-page.component";
import { MainPageComponent } from "./main-page/main-page.component";
import { AddAuthorComponent } from "./authors/add-author/add-author.component";
import { AdminAuthorPageComponent } from "./authors/admin-author-page/admin-author-page.component";
import { EditAuthorComponent } from "./authors/edit-author/edit-author.component";
import { AdminAuthorDetailsPageComponent } from "./authors/admin-author-details-page/admin-author-details-page.component";
import { AddBookComponent } from "./books/add-book/add-book.component";
import { AdminBookPageComponent } from "./books/admin-book-page/admin-book-page.component";
import { EditBookComponent } from "./books/edit-book/edit-book.component";
import { AddBlogComponent } from "./blogs/add-blog/add-blog.component";
import { AdminBlogPageComponent } from "./blogs/admin-blog-page/admin-blog-page.component";
import { EditBlogComponent } from "./blogs/edit-blog/edit-blog.component";
import { AdminBlogDetailsComponent } from "./blogs/admin-blog-details/admin-blog-details.component";
import { BlogDetailPageComponent } from "./blogs/blog-detail-page/blog-detail-page.component";
import { AuthorDetailPageComponent } from "./authors/author-detail-page/author-detail-page.component";

const routes: Routes = [
    { path: "", component: MainPageComponent , children: [
        { path: "", component: HomePageComponent },
        { path: "about", component: AboutPageComponent },
        { path: "books", component: BooksPageComponent },
        { path: "authors", component: AuthorPageComponent },
        { path: "authors/books/:id", component: AuthorDetailPageComponent },
        { path: "blogs", component: BlogPageComponent },
        { path: "blogs/:id", component: BlogDetailPageComponent },
        { path: "contact-us", component: ContactUsPageComponent },
        { path: "signup", component: SignupPageComponent },
        { path: "login", component: LoginPageComponent }
    ]},
    
    { path: "admin", component: AdminPortalComponent, canActivate: [AuthGuard, AuthAdminGuard], children: [
        { path: "", component: AdminPageComponent },
        { path: "authors", component: AdminAuthorPageComponent },
        { path: "add-author", component: AddAuthorComponent },
        { path: "edit-author/:id", component: EditAuthorComponent },
        { path: "authors/:id", component: AdminAuthorDetailsPageComponent },
        { path: "add-book", component: AddBookComponent },
        { path: "books", component: AdminBookPageComponent },
        { path: "edit-book/:id", component: EditBookComponent },
        { path: "add-blog", component: AddBlogComponent },
        { path: "blogs", component: AdminBlogPageComponent },
        { path: "edit-blog/:id", component: EditBlogComponent },
        { path: "blogs/:id", component: AdminBlogDetailsComponent }
    ] }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: "enabled" })],
    exports: [RouterModule],
    providers: [AuthGuard, AuthAdminGuard]
})
export class AppRoutingModule {

}