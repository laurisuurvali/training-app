import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {ActivatedRoute, Router} from '@angular/router';
import {Challenge} from '../../../_models/challenge';
import {Subscription} from '../../../_models/subscription';
import {SubscriptionService} from '../../../_services/admin/subscription.service';
import {SubscriptionAddDialogComponent} from './dialogs/add/subscription-add.dialog.component';
import {SubscriptionDeleteDialogComponent} from './dialogs/delete/subscription-delete.dialog.component';
import {SubscriptionEditDialogComponent} from './dialogs/edit/subscription-edit.dialog.component';

@Component({
  selector: 'app-subscriptions',
  templateUrl: './subscriptions.component.html',
  styleUrls: ['./subscriptions.component.css']
})
export class SubscriptionsComponent implements OnInit {

  displayedColumns = ['id', 'startDate', 'endDate', 'challengeName', 'users', 'actions'];
  dataSource: MatTableDataSource<Subscription>;
  index: number;
  subscriptionId: number;
  challenges: Challenge[] = [];


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public dialog: MatDialog,
              public service: SubscriptionService,
              private changeDetectorRefs: ChangeDetectorRef,
              public router: Router,
              public route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource();

    this.dataSource.filterPredicate = (data, filter: string) => {
      const accumulator = (currentTerm, key) => {
        return this.nestedFilterCheck(currentTerm, data, key);
      };
      const dataStr = Object.keys(data).reduce(accumulator, '').toLowerCase();
      const transformedFilter = filter.trim().toLowerCase();
      return dataStr.indexOf(transformedFilter) !== -1;
    };

    this.loadData();
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  addNew(): void {
    const dialogRef = this.dialog.open(SubscriptionAddDialogComponent, {
      data: {subscription: Subscription}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        this.loadData();
      }
    });
  }

  startEdit(i: number, subscriptionId: number, startDate: Date, challenge: Challenge): void {
    this.subscriptionId = subscriptionId;
    this.index = i;
    const dialogRef = this.dialog.open(SubscriptionEditDialogComponent, {
      data: {subscriptionId, startDate, challenge}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result === 1) {
        this.loadData();
      }
    });
  }

  details(id: number): void {
    this.router.navigate([id], {relativeTo: this.route});

  }

  deleteItem(i: number, subscriptionId: number, startDate: Date, challengeName: string): void {
    this.index = i;
    this.subscriptionId = subscriptionId;
    const dialogRef = this.dialog.open(SubscriptionDeleteDialogComponent, {
      data: {subscriptionId, startDate, challengeName}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result === 1) {
        this.loadData();
      }
    });
  }


  private refreshTable(): void {
    this.paginator._changePageSize(this.paginator.pageSize);
  }


  loadData(): void {
    this.service.getAllSubscriptions().subscribe(result => {
      this.dataSource.data = result;
    });
    this.changeDetectorRefs.detectChanges();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  nestedFilterCheck(search, data, key): void {
    if (typeof data[key] === 'object') {
      for (const k in data[key]) {
        if (data[key][k] !== null) {
          search = this.nestedFilterCheck(search, data[key], k);
        }
      }
    } else {
      search += data[key];
    }
    return search;
  }
}

