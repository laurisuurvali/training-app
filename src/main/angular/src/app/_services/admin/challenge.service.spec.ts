import { TestBed } from '@angular/core/testing';

import { ChallengeService } from './challenge.service';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {FormsModule} from '@angular/forms';


describe('ChallengeService', () => {
  let service: ChallengeService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChallengeService],
      imports: [HttpClientTestingModule,
      RouterTestingModule.withRoutes([]),
      FormsModule,
      HttpClientTestingModule]
    });
    service = TestBed.inject(ChallengeService);
    httpTestingController = TestBed.inject(HttpTestingController);

  });

  afterEach(() => {
    httpTestingController.verify();
  });

  fit('should retrieve all challenges', () => {
    service.getAllChallenges()
      .subscribe(challenges => {

        expect(challenges).toBeTruthy('No challenges returned');

        expect(challenges.length).toBe(2,
          'incorrect number of challenges');

        const challenge = challenges.find(challenge => challenge.challengeId === 2);
        expect(challenge.challengeName).toBe('Second Amazing Challenge');
  });

    const req = httpTestingController.expectOne('http://localhost:8081/api/v1/admin/challenge/');
    expect(req.request.method).toEqual('GET');

  });


  it('should save the challenge data', () => {



  });

});
