import {HttpClientModule} from '@angular/common/http';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {MatDialogModule} from '@angular/material/dialog';
import {RouterTestingModule} from '@angular/router/testing';

import {MealAdminComponent} from './meal-admin.component';


describe('MealAdminComponent', () => {
  let component: MealAdminComponent;
  let fixture: ComponentFixture<MealAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MealAdminComponent],
      imports: [
        RouterTestingModule,
        HttpClientModule,
        MatDialogModule
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MealAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
