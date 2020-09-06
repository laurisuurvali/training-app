import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetPasswordErrorComponent } from './reset-password-error.component';

describe('ResetPasswordErrorComponent', () => {
  let component: ResetPasswordErrorComponent;
  let fixture: ComponentFixture<ResetPasswordErrorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResetPasswordErrorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetPasswordErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
