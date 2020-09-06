import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NonAuthenticatedComponent } from './non-authenticated.component';

describe('NonAuthenticatedComponent', () => {
  let component: NonAuthenticatedComponent;
  let fixture: ComponentFixture<NonAuthenticatedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NonAuthenticatedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NonAuthenticatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
