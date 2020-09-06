import { TestBed } from '@angular/core/testing';

import { ExerciseService } from './exercise.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClient} from "@angular/common/http";
import {ChallengeService} from "./challenge.service";
import {Test} from "tslint";

describe('ExerciseService', () => {
  let service: ExerciseService;
  let httpClient: HttpClient;

  // noinspection BadExpressionStatementJS
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ExerciseService],
    });
    service = TestBed.get(ExerciseService); // * inject service instance
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  });
