import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';

@Component({
  selector: 'app-tips',
  templateUrl: './tips.component.html',
  styleUrls: ['./tips.component.css']
})
export class TipsComponent implements OnInit {

  constructor(public router: Router,
              public route: ActivatedRoute) {

  }

  ngOnInit(): void {
    const element = document.querySelector('mat-sidenav-content') || window;
    element.scrollTo(0, 0);
  }

  openArticle(id: number): void {
    this.router.navigate([id], {relativeTo: this.route});
  }

}
