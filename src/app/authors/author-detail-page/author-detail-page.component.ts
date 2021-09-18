import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { AuthorService } from '../author.service';

@Component({
  selector: 'app-author-detail-page',
  templateUrl: './author-detail-page.component.html',
  styleUrls: ['./author-detail-page.component.css']
})
export class AuthorDetailPageComponent implements OnInit {
  author: any = null;
  authorBooks: any = [];

  isLoading: boolean = false;
  modalType: string | null = null;
  modalMessage: string | null = null;

  constructor(private authorService: AuthorService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((param: ParamMap) => {
      var authorId = param.get("id")
      this.authorService.getAuthorBooks(authorId).subscribe(response => {
        this.author = response.author;
        this.authorBooks = response.books;
      })
    });
  }
}
