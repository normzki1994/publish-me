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
    ModalComponent
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
