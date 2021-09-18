import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FontAwesomeModule, FaIconComponent } from '@fortawesome/angular-fontawesome';
import { FooterComponent } from './footer/footer.component';
import { HomePageComponent } from './home-page/home-page.component';
import { AboutPageComponent } from './about-page/about-page.component';
import { WelcomeByAuthorComponent } from './welcome-by-author/welcome-by-author.component';
import { TestimonialsComponent } from './testimonials/testimonials.component';
import { StatsComponent } from './stats/stats.component';
import { BooksPageComponent } from './books/books-page/books-page.component';
import { IntroductionHeaderComponent } from './introduction-header/introduction-header.component';
import { AuthorPageComponent } from './authors/author-page/author-page.component';
import { BlogPageComponent } from './blogs/blog-page/blog-page.component';
import { ContactUsPageComponent } from './contact-us-page/contact-us-page.component';
import { SignupPageComponent } from './auth/signup-page/signup-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { ModalComponent } from './shared/modal/modal.component';
import { LoginPageComponent } from './auth/login-page/login-page.component';
import { AdminPortalComponent } from './admin/admin-portal/admin-portal.component';
import { AdminPageComponent } from './admin/admin-page/admin-page.component';
import { AdminHeaderComponent } from './admin/admin-header/admin-header.component';
import { MainPageComponent } from './main-page/main-page.component';
import { AddAuthorComponent } from './authors/add-author/add-author.component';
import { AdminAuthorPageComponent } from './authors/admin-author-page/admin-author-page.component';
import { EditAuthorComponent } from './authors/edit-author/edit-author.component';
import { AdminAuthorDetailsPageComponent } from './authors/admin-author-details-page/admin-author-details-page.component';
import { AddBookComponent } from './books/add-book/add-book.component';
import { AdminBookPageComponent } from './books/admin-book-page/admin-book-page.component';
import { EditBookComponent } from './books/edit-book/edit-book.component';
import { AddBlogComponent } from './blogs/add-blog/add-blog.component';
import { EditBlogComponent } from './blogs/edit-blog/edit-blog.component';
import { AdminBlogPageComponent } from './blogs/admin-blog-page/admin-blog-page.component';
import { AdminBlogDetailsComponent } from './blogs/admin-blog-details/admin-blog-details.component';
import { BlogDetailPageComponent } from './blogs/blog-detail-page/blog-detail-page.component';
import { AuthorDetailPageComponent } from './authors/author-detail-page/author-detail-page.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomePageComponent,
    AboutPageComponent,
    WelcomeByAuthorComponent,
    TestimonialsComponent,
    StatsComponent,
    BooksPageComponent,
    IntroductionHeaderComponent,
    AuthorPageComponent,
    BlogPageComponent,
    ContactUsPageComponent,
    SignupPageComponent,
    LoadingSpinnerComponent,
    ModalComponent,
    LoginPageComponent,
    AdminPortalComponent,
    AdminPageComponent,
    AdminHeaderComponent,
    MainPageComponent,
    AddAuthorComponent,
    AdminAuthorPageComponent,
    EditAuthorComponent,
    AdminAuthorDetailsPageComponent,
    AddBookComponent,
    AdminBookPageComponent,
    EditBookComponent,
    AddBlogComponent,
    EditBlogComponent,
    AdminBlogPageComponent,
    AdminBlogDetailsComponent,
    BlogDetailPageComponent,
    AuthorDetailPageComponent
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [FaIconComponent]
})
export class AppModule { }
