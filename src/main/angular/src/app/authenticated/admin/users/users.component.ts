import {ChangeDetectorRef, Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {Router} from '@angular/router';
import {User} from '../../../_models/user';
import {UserService} from '../../../_services/admin/user.service';
import {UserAddDialogComponent} from './dialogs/add/user-add.dialog.component';
import {UserDeleteDialogComponent} from './dialogs/delete/user-delete.dialog.component';
import {UserEditDialogComponent} from './dialogs/edit/user-edit.dialog.component';
import {UserPatchDialogComponent} from './dialogs/patch/user-patch.dialog.component';
import {UserResetPasswordDialogComponent} from './dialogs/resetPassword/user-reset-password.dialog.component';
import {Status} from "../../../_models/status";


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})

export class UsersComponent implements OnInit {
  displayedColumns = ['id', 'username', 'firstName', 'lastName', 'subscription', 'roles', 'status', 'created', 'updated', 'actions'];

  @Input() dataSource: MatTableDataSource<User>;
  index: number;
  id: number;
  subscriptionId: number;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public dialog: MatDialog,
              public userService: UserService,
              public changeDetectorRefs: ChangeDetectorRef,
              public router: Router) {
  }


  ngOnInit(): void {
    this.dataSource = new MatTableDataSource();
    this.loadData();
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  addNew(): void {
    const dialogRef = this.dialog.open(UserAddDialogComponent, {
      data: {user: User}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        this.loadData();
      }
    });
  }

  startEdit(i: number,
            id: number,
            username: string,
            firstName: string,
            lastName: string,
            subscriptionSubscriptionId: number,
            status: Status): void {
    this.id = id;
    this.index = i;
    console.log(this.index);
    const dialogRef = this.dialog.open(UserEditDialogComponent, {
      data: {id, username, firstName, lastName, subscriptionSubscriptionId, status}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        this.loadData();
      }
    });
  }

  deleteItem(i: number, id: number, username: string): void {
    this.index = i;
    this.id = id;
    const dialogRef = this.dialog.open(UserDeleteDialogComponent, {
      data: {id, username}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        this.loadData();
      }
    });
  }

  sendResetPasswordLink(i: number, id: number, username: string): void {
    this.index = i;
    this.id = id;
    const dialogRef = this.dialog.open(UserResetPasswordDialogComponent, {
      data: {id, email: username}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        this.loadData();
      }
    });
  }

  deleteUserSubscription(i: number, id: number, username: string): void {
    this.index = i;
    this.id = id;
    const dialogRef = this.dialog.open(UserPatchDialogComponent, {
      data: {id, username}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        this.loadData();
      }
    });
  }

  loadData(): void {
    this.userService.getAllUsers().subscribe(result => {
      this.dataSource.data = result;
    });
    this.changeDetectorRefs.detectChanges();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


  goToSubscription(subscriptionSubscriptionId: number): void {
    this.router.navigate(['admin/subscriptions/' + subscriptionSubscriptionId]);
  }

  formatUserRoles(userRole: string): string {
    if (userRole.includes('ADMIN')) {
      return 'admin';
    }
    return 'user';
  }

}
