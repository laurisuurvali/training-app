import {HttpClient} from '@angular/common/http';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {DebugElement} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {MatDialog} from '@angular/material/dialog';
import {By} from '@angular/platform-browser';
import {RouterTestingModule} from '@angular/router/testing';

import {SubscriptionsComponent} from './subscriptions.component';

const data = [
  {id: 1, startDate: 2020 - 12 - 17, challengeName: 'Initial Super Challenge'},
  {id: 2, startDate: 2020 - 12 - 17, challengeName: 'Initial Super Challenge'}
];

describe('SubscriptionsComponent', () => {
  let component: SubscriptionsComponent;
  let fixture: ComponentFixture<SubscriptionsComponent>;
  let el: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SubscriptionsComponent],
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [
        {provide: MatDialog, useValue: {}},
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscriptionsComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  fit('should display the subscription list', () => {

    fixture.detectChanges();

    const subscriptions = el.queryAll(By.css('subscriptions'));

    expect(data).toBeTruthy('Could not find subscriptions');
    expect(data.length).toBe(2, 'Unexpected number of subscriptions');
  })
});
