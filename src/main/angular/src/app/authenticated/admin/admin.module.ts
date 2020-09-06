import {registerLocaleData} from '@angular/common';
import localeEe from '@angular/common/locales/et';
import {LOCALE_ID, NgModule} from '@angular/core';
import {MatRippleModule} from '@angular/material/core';
import {SubscriptionService} from '../../_services/admin/subscription.service';
import {authInterceptorProviders} from '../../_services/security/auth.interceptor';
import {SharedModule} from '../../shared/shared.module';
import {UserModule} from '../user/user.module';
import {AdminRouting} from './admin.routing';
import {ChallengeDayComponent} from './challenges/challenge-day/challenge-day.component';
import {ExerciseAddComponent} from './challenges/challenge-day/exercise-admin/dialogs/exercise-add/exercise-add.component';
import {ExerciseDeleteComponent} from './challenges/challenge-day/exercise-admin/dialogs/exercise-delete/exercise-delete.component';
import {ExerciseEditComponent} from './challenges/challenge-day/exercise-admin/dialogs/exercise-edit/exercise-edit.component';
import {ExercisePreviewComponent} from './challenges/challenge-day/exercise-admin/dialogs/exercise-preview/exercise-preview.component';
import {ExerciseAdminComponent} from './challenges/challenge-day/exercise-admin/exercise-admin.component';
import {InstructionAddComponent} from './challenges/challenge-day/instruction-admin/dialogs/instruction-add/instruction-add.component';
import {InstructionDeleteComponent} from './challenges/challenge-day/instruction-admin/dialogs/instruction-delete/instruction-delete.component';
import {InstructionEditComponent} from './challenges/challenge-day/instruction-admin/dialogs/instruction-edit/instruction-edit.component';
import {InstructionPreviewComponent} from './challenges/challenge-day/instruction-admin/dialogs/instruction-preview/instruction-preview.component';
import {InstructionAdminComponent} from './challenges/challenge-day/instruction-admin/instruction-admin.component';
import {MealAddComponent} from './challenges/challenge-day/meal-admin/dialogs/meal-add/meal-add.component';
import {MealDeleteComponent} from './challenges/challenge-day/meal-admin/dialogs/meal-delete/meal-delete.component';
import {MealEditComponent} from './challenges/challenge-day/meal-admin/dialogs/meal-edit/meal-edit.component';
import {MealPreviewComponent} from './challenges/challenge-day/meal-admin/dialogs/meal-preview/meal-preview.component';
import {MealAdminComponent} from './challenges/challenge-day/meal-admin/meal-admin.component';
import {ChallengesComponent} from './challenges/challenges.component';
import {ChallengeAddComponent} from './challenges/dialogs/challenge-add/challenge-add.component';
import {ChallengeDeleteComponent} from './challenges/dialogs/challenge-delete/challenge-delete.component';
import {ChallengeEditComponent} from './challenges/dialogs/challenge-edit/challenge-edit.component';
import {SubscriptionAddDialogComponent} from './subscriptions/dialogs/add/subscription-add.dialog.component';
import {SubscriptionDeleteDialogComponent} from './subscriptions/dialogs/delete/subscription-delete.dialog.component';
import {SubscriptionEditDialogComponent} from './subscriptions/dialogs/edit/subscription-edit.dialog.component';
import {SubscriptionDetailsComponent} from './subscriptions/subscription-details/subscription-details.component';
import {SubscrUsersResetPassDialog} from './subscriptions/subscription-details/subscription-users/dialogs/resetAllUsersPasswords/subscr-users-reset-pass.dialog';
import {SubscriptionUsersComponent} from './subscriptions/subscription-details/subscription-users/subscription-users.component';
import {SubscriptionsComponent} from './subscriptions/subscriptions.component';
import {UserAddDialogComponent} from './users/dialogs/add/user-add.dialog.component';
import {UserDeleteDialogComponent} from './users/dialogs/delete/user-delete.dialog.component';
import {UserEditDialogComponent} from './users/dialogs/edit/user-edit.dialog.component';
import {UserPatchDialogComponent} from './users/dialogs/patch/user-patch.dialog.component';
import {UserResetPasswordDialogComponent} from './users/dialogs/resetPassword/user-reset-password.dialog.component';
import {UsersComponent} from './users/users.component';

registerLocaleData(localeEe);


@NgModule({
  declarations: [
    ChallengesComponent,
    UsersComponent,
    UserAddDialogComponent,
    UserDeleteDialogComponent,
    SubscriptionAddDialogComponent,
    SubscriptionEditDialogComponent,
    SubscriptionDeleteDialogComponent,
    UserEditDialogComponent,
    SubscriptionsComponent,
    SubscriptionDetailsComponent,
    SubscriptionUsersComponent,
    SubscriptionUsersComponent,
    ChallengeEditComponent,
    ChallengeDeleteComponent,
    MealAdminComponent,
    MealEditComponent,
    MealDeleteComponent,
    MealAddComponent,
    ExerciseAdminComponent,
    ExerciseAddComponent,
    ExerciseDeleteComponent,
    ExerciseEditComponent,
    ChallengeAddComponent,
    ChallengeDayComponent,
    InstructionAdminComponent,
    InstructionAddComponent,
    InstructionDeleteComponent,
    InstructionEditComponent,
    ExercisePreviewComponent,
    MealPreviewComponent,
    InstructionPreviewComponent,
    UserPatchDialogComponent,
    UserResetPasswordDialogComponent,
    SubscrUsersResetPassDialog
  ],

  imports: [
    AdminRouting,
    SharedModule,
    MatRippleModule,
    UserModule
  ],
  providers: [
    authInterceptorProviders,
    SubscriptionService,
    {provide: LOCALE_ID, useValue: 'et-EE'}
  ],

})

export class AdminModule {
}
