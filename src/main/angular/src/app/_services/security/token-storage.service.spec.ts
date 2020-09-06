import { TestBed } from '@angular/core/testing';

import { TokenStorageService } from './token-storage.service';
import {HttpClient} from "@angular/common/http";
import {HttpTestingController} from "@angular/common/http/testing";

describe('TokenStorageService', () => {
  let service: TokenStorageService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TokenStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
