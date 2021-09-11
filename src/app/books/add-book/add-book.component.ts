import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { AuthorService } from 'src/app/authors/author.service';
import { BookService } from "../book.service";

import { isImageValidator } from 'src/app/validators/is-image.validator';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {
  bookForm: FormGroup = new FormGroup({
    "title": new FormControl("", [Validators.required, Validators.maxLength(150), Validators.minLength(2)]),
    "image": new FormControl("", [Validators.required, isImageValidator()]),
    "author": new FormControl("", [Validators.required]), // Ref to author model (author id)
    "price": new FormControl(0, [Validators.required, Validators.min(10), Validators.max(500)]),
    "genre": new FormControl("", [Validators.required]),
    "date-published": new FormControl(new Date(), [Validators.required])
  });

  authors: any = [];

  imagePreview: any = null;

  get title() { return this.bookForm.get("title") };
  get image() { return this.bookForm.get("image") };
  get author() { return this.bookForm.get("author") };
  get price() { return this.bookForm.get("price") };
  get genre() { return this.bookForm.get("genre") };
  get datePublished() { return this.bookForm.get("date-published") };

  isLoading: boolean = false;
  modalType: string | null = null;
  modalMessage: string | null = null;

  constructor(private authorService: AuthorService, private bookService: BookService) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.authorService.getAllAuthors().subscribe(authors => {
      this.isLoading = false;
      this.authors = authors;
    }, error => {
      console.log(error)
      this.isLoading = false;
      this.modalType = "Error";
      this.modalMessage = "Something went wrong";
    })
  }

  onSubmit() {
    this.isLoading = true;
    this.bookService.addBook(this.title?.value, this.image?.value, this.author?.value, this.price?.value,
      this.genre?.value, this.datePublished?.value)
      .subscribe(response => {
        this.isLoading = false;
        this.modalType = "Info";
        this.modalMessage = "Book added successfully";
      }, error => {
        this.isLoading = false;
        this.modalType = "Error";
        this.modalMessage = "Something went wrong";
      })
  }

  onImagePicked(event: Event) {
    this.bookForm.get("image")?.markAsTouched();
    this.bookForm.get("image")?.markAsDirty();

    const file = (<HTMLInputElement>event.target).files;
    var myImage: any;
    if(file) {
        myImage = file[0];
    } else {
      return;
    }

    this.bookForm.patchValue({image: myImage});
    this.bookForm.get("image")?.updateValueAndValidity();

    const validImageType = ["image/jpg", "image/jpeg", "image/png"];
    if(!validImageType.includes(myImage.type)) {
      return;
    }
    
    const reader = new FileReader();
    reader.onload = () => {
        this.imagePreview = reader.result;
    };
    reader.readAsDataURL(myImage);
  
  }
}
