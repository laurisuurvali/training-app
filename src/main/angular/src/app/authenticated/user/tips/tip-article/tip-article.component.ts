import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-tip-article',
  templateUrl: './tip-article.component.html',
  styleUrls: ['./tip-article.component.css']
})
export class TipArticleComponent implements OnInit {

  articleId: number;

  constructor(public router: Router,
              public route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.articleId = this.route.snapshot.params.id;
    const element = document.querySelector('mat-sidenav-content') || window;
    element.scrollTo(0, 0);
  }

  returnToTips(): void {
    this.router.navigate(['..'], {relativeTo: this.route});

  }
}
