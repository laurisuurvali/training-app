import {HttpClientModule} from '@angular/common/http';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';

import {MealDeleteComponent} from './meal-delete.component';

describe('MealDeleteComponent', () => {
  let component: MealDeleteComponent;
  let fixture: ComponentFixture<MealDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MealDeleteComponent],
      imports: [MatDialogModule, HttpClientModule],
      providers: [
        {provide: MatDialogRef, useValue: {}},
        {provide: MAT_DIALOG_DATA, useValue: {}}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MealDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
