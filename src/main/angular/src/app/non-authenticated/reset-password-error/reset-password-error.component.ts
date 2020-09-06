import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-reset-password-error',
  templateUrl: './reset-password-error.component.html',
  styleUrls: ['../non-authenticated.component.css']
})
export class ResetPasswordErrorComponent implements OnInit {

  errorMessage: string;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {
          console.log(params);

          this.errorMessage = params.errorMessage;
          console.log(this.errorMessage);
        }
      );
  }

}
