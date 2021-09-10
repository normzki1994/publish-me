import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

import { isImageValidator } from "../../validators/is-image.validator";
import { AuthorService } from '../author.service';

@Component({
  selector: 'app-edit-author',
  templateUrl: './edit-author.component.html',
  styleUrls: ['./edit-author.component.css']
})
export class EditAuthorComponent implements OnInit {
  authorForm: FormGroup = new FormGroup({
    "name": new FormControl("", [Validators.required, Validators.maxLength(150), Validators.minLength(2)]),
    "image": new FormControl(""),
    "description": new FormControl("", [Validators.required, Validators.maxLength(150), Validators.minLength(10)])
  });

  imagePreview: any = null;

  get name() { return this.authorForm.get("name") };
  get image() { return this.authorForm.get("image") };
  get description() { return this.authorForm.get("description") };

  isLoading: boolean = false;
  modalType: string | null = null;
  modalMessage: string | null = null;

  authorId: any = null;

  constructor(private authorService: AuthorService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      var authorId = paramMap.get("id");
      this.authorId = authorId;

      this.authorService.getAuthor(authorId).subscribe(author => {
        this.isLoading = false;
        if(author) {
          this.imagePreview = author.imagePath;
          var imageFromImgTag = null;
          
          var xhr = new XMLHttpRequest();
          xhr.open("GET", author.imagePath, true); 
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
          console.log(this.authorForm.get("image")?.value)
          this.authorForm.setValue({ name: author.name, description: author.description, image: imageFromImgTag });
        }
      }, error => {
        this.isLoading = false;
        this.modalType = "Error";
        this.modalMessage = "Something went wrong";
      })
    });
  }

  onSubmit(event: Event) {
    this.isLoading = true;
    this.authorService.updateAuthor(this.authorId, this.name?.value, this.image?.value, this.description?.value)
      .subscribe(response => {
        this.isLoading = false;
        this.router.navigate(["/admin/authors"]);
      }, error => {
        this.isLoading = false;
        this.modalType = "Error";
        this.modalMessage = "Something went wrong";
      })
  }

  onImagePicked(event: Event) {
    this.authorForm.get("image")?.markAsTouched();
    this.authorForm.get("image")?.markAsDirty();

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

    this.authorForm.get("image")?.addValidators(isImageValidator());
    this.authorForm.patchValue({image: myImage});
    this.authorForm.get("image")?.updateValueAndValidity();

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

  getFileFromImageTag() {

  }
}
