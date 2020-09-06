import {ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../../../../../_models/user';
import {SubscriptionService} from '../../../../../_services/admin/subscription.service';
import {UserService} from '../../../../../_services/admin/user.service';
import {UserResetPasswordDialogComponent} from '../../../users/dialogs/resetPassword/user-reset-password.dialog.component';
import {UsersComponent} from '../../../users/users.component';
import {SubscrUsersResetPassDialog} from './dialogs/resetAllUsersPasswords/subscr-users-reset-pass.dialog';

@Component({
  selector: 'app-subscription-users',
  templateUrl: '../../../users/users.component.html',
  styleUrls: ['../../../users/users.component.css']
})
export class SubscriptionUsersComponent extends UsersComponent implements OnInit {

  displayedColumns = ['id', 'username', 'firstName', 'lastName', 'actions'];

  dataSource: MatTableDataSource<User>;
  index: number;
  id: number;
  subscriptionId: number;

  constructor(
    public dialog: MatDialog,
    public service: UserService,
    private activateRoute: ActivatedRoute,
    public subscriptionService: SubscriptionService,
    public changeDetectorRefs: ChangeDetectorRef,
    public router: Router) {
    super(dialog, service, changeDetectorRefs, router);

    this.subscriptionId = activateRoute.snapshot.params.id;
  }

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild('filter', {static: true}) filter: ElementRef;

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource();
    this.loadData();
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  loadData(): void {
    this.service.getAllUsersBySubscriptionId(this.subscriptionId).subscribe(result => {
      this.dataSource.data = result;
    });
    this.changeDetectorRefs.detectChanges();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


}
