import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { AuthorService } from '../author.service';

@Component({
  selector: 'app-admin-author-details-page',
  templateUrl: './admin-author-details-page.component.html',
  styleUrls: ['./admin-author-details-page.component.css']
})
export class AdminAuthorDetailsPageComponent implements OnInit {
  author: any = null;

  isLoading: boolean = false;
  modalType: string | null = null;
  modalMessage: string | null = null;

  constructor(private authorService: AuthorService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.isLoading = true;

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      var authorId = paramMap.get("id");

      this.authorService.getAuthor(authorId).subscribe(author => {
        this.isLoading = false;
        this.author = author;
      }, error => {
        this.isLoading = false;
        this.modalType = "Error";
        this.modalMessage = "Something went wrong";
      })
    });
  }

  onDelete(authorId: any) {
    this.isLoading = true;

    this.authorService.deleteAuthor(authorId).subscribe(response => {
      this.isLoading = false;
      this.router.navigate(["/admin/authors"]);
    }, error => {
      this.isLoading = false;
      this.modalType = "Error";
      this.modalMessage = "Something went wrong";
    });
  }
}
