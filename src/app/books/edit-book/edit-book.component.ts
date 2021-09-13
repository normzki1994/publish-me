import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { AuthorService } from 'src/app/authors/author.service';

import { isImageValidator } from "../../validators/is-image.validator"
import { BookService } from '../book.service';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css']
})
export class EditBookComponent implements OnInit {
  bookForm: FormGroup = new FormGroup({
    "title": new FormControl("", [Validators.required, Validators.maxLength(150), Validators.minLength(2)]),
    "image": new FormControl(null),
    "author": new FormControl(null, [Validators.required]), // Ref to author model (author id)
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

  bookId: any = null;

  constructor(private bookService: BookService, private router: Router, private route: ActivatedRoute,
    private authorService: AuthorService) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.authorService.getAllAuthors().subscribe(authors => {
      this.authors = authors;

      this.route.paramMap.subscribe((paramMap: ParamMap) => {
        var bookId = paramMap.get("id");
        this.bookId = bookId;
  
        this.bookService.getBook(bookId).subscribe(book => {
          this.isLoading = false;
          if(book) {
            console.log(book)
            this.imagePreview = book.imagePath;
            var imageFromImgTag = null;
            
            var xhr = new XMLHttpRequest();
            xhr.open("GET", book.imagePath, true); 
            xhr.responseType = "blob";
            xhr.onload = function (e) {
              // console.log(this.response);
              imageFromImgTag = this.response;
              // var reader = new FileReader();
              // reader.onload = function(event) {
              //   var res = event?.target?.result;
              //   // console.log(res)
              // }
              // var file = this.response;
              // reader.readAsDataURL(file)
            };
            xhr.send()
            this.bookForm.setValue({ title: book.title, author: book.author, image: imageFromImgTag,
            price: book.price, genre: book.genre, "date-published": new Date(book.datePublished).toISOString().split('T')[0] });
            console.log(this.image?.valid);
          }
        }, error => {
          this.isLoading = false;
          this.modalType = "Error";
          this.modalMessage = "Something went wrong";
        })
      });
    }, error => {
      console.log(error)
      this.isLoading = false;
      this.modalType = "Error";
      this.modalMessage = "Something went wrong";
    })
  }

  onSubmit() {
    this.isLoading = true;
    this.bookService.updateBook(this.bookId, this.title?.value, this.image?.value, this.author?.value,
      this.price?.value, this.genre?.value, this.datePublished?.value)
      .subscribe(response => {
        this.isLoading = false;
        this.router.navigate(["/admin/books"]);
      }, error => {
        this.isLoading = false;
        this.modalType = "Error";
        this.modalMessage = "Something went wrong";
      })
  }

  onImagePicked(event: Event) {
    this.bookForm.get("image")?.markAsTouched();
    this.bookForm.get("image")?.markAsDirty();

    this.getImageFile(event);
  }

  getImageFile(event: Event) {
    const file = (<HTMLInputElement>event.target).files;
    var myImage: any;
    if(file) {
        myImage = file[0];
    } else {
      return;
    }

    this.bookForm.get("image")?.addValidators(isImageValidator());
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
