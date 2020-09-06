import { TestBed } from '@angular/core/testing';

import { ChallengeDayService } from './challenge-day.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {FormsModule} from "@angular/forms";
import {HttpClient} from "@angular/common/http";

describe('ChallengeDayService', () => {
  let service: ChallengeDayService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let response: any;
  let errResponse: any;


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule,
        RouterTestingModule.withRoutes([]),
        FormsModule,
        HttpClientTestingModule]
    });
    service = TestBed.inject(ChallengeDayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
