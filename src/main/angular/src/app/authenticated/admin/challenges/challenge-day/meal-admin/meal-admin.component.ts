import {ChangeDetectorRef, Component, Input, OnChanges, SimpleChanges, ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort, MatSortable} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {ActivatedRoute, Router} from '@angular/router';
import {ChallengeDay} from '../../../../../_models/challenge-day';
import {Meal} from '../../../../../_models/meal';
import {MealType} from '../../../../../_models/meal-type';
import {ChallengeDayService} from '../../../../../_services/admin/challenge-day.service';
import {MealService} from '../../../../../_services/admin/meal.service';
import {MealAddComponent} from './dialogs/meal-add/meal-add.component';
import {MealDeleteComponent} from './dialogs/meal-delete/meal-delete.component';
import {MealEditComponent} from './dialogs/meal-edit/meal-edit.component';
import {MealPreviewComponent} from './dialogs/meal-preview/meal-preview.component';

@Component({
  selector: 'app-meal-admin',
  templateUrl: './meal-admin.component.html',
  styleUrls: ['./meal-admin.component.css']
})
export class MealAdminComponent implements OnChanges {
  @Input() dayNumberId: number;
  @Input() weekNumberId: number;

  displayedColumns = ['mealType', 'mealName', 'mealId', 'calories', 'carbohydrates', 'fat', 'protein', 'preview', 'actions'];
  dataSource: MatTableDataSource<Meal>;
  challengeId: number;
  challengeDay: ChallengeDay = new ChallengeDay();
  meal: Meal;
  id: number;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private activateRoute: ActivatedRoute,
              public dialog: MatDialog,
              public mealService: MealService,
              public router: Router,
              public route: ActivatedRoute,
              private changeDetectorRefs: ChangeDetectorRef,
              public challengeDayService: ChallengeDayService
  ) {
    this.challengeId = activateRoute.snapshot.params.id;
    this.route.queryParams.subscribe(params => {
      this.weekNumberId = params.weekNumberId;
      this.dayNumberId = params.dayNumberId;
    });
    this.dataSource = new MatTableDataSource();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.dayNumberId || changes.weekNumberId) {
      this.loadData();
      this.sort.sort(({ id: 'orderNumber', start: 'asc'}) as MatSortable);
    }
    this.challengeDayService.getChallengeDayBySeparateId(this.challengeId,
      this.weekNumberId.toString(),
      this.dayNumberId.toString()).subscribe( result => {
        this.challengeDay = result;
      }
    );
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  previewMeal(meal: Meal): void {
    console.log(meal);
    const dialogRef = this.dialog.open(MealPreviewComponent, {
      panelClass: 'preview-panel-meal',
      height: '600px',
      autoFocus: false,
      data: {meal}
    });
  }

  addNew(): void {
    const dialogRef = this.dialog.open(MealAddComponent, {
      data: {
        currentChallengeDay: this.challengeDay,
        meal: Meal, }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        this.loadData();
      }
    });
  }

  deleteItem(mealId: number, mealName: string, mealType: MealType): void {
    this.id = mealId;
    const dialogRef = this.dialog.open(MealDeleteComponent, {
      data: {mealId, mealName, mealType}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        this.loadData();
      }
    });
  }

  startEdit(mealId: number,
            mealType: MealType,
            mealName: string,
            calories: string,
            carbohydrates: string,
            fat: string,
            protein: string,
            recipe: string,
            imageLink: string): void {
    this.id = mealId;
    const dialogRef = this.dialog.open(MealEditComponent, {
      data: {
        mealId,
        mealType,
        mealName,
        calories,
        carbohydrates,
        fat,
        protein,
        recipe,
        imageLink,
        challengeDay: this.challengeDay
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        this.loadData();
      }
    });
  }

  loadData(): void {
    this.mealService.getMealsByChallengeDayId(
      this.challengeId.toString(),
      this.weekNumberId.toString(),
      this.dayNumberId.toString()).subscribe(result => {
      this.dataSource.data = result;
    });
    this.changeDetectorRefs.detectChanges();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}
