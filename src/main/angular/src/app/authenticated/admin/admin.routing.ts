import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ChallengeDayComponent} from './challenges/challenge-day/challenge-day.component';
import {ChallengesComponent} from './challenges/challenges.component';
import {SubscriptionDetailsComponent} from './subscriptions/subscription-details/subscription-details.component';
import {SubscriptionsComponent} from './subscriptions/subscriptions.component';
import {UsersComponent} from './users/users.component';


const routes: Routes = [
  {
    path: '', children: [
      {path: 'challenges', component: ChallengesComponent},
      {path: 'challenges/:id/challenge_days', component: ChallengeDayComponent},
      {path: 'customers', component: UsersComponent},
      {path: 'subscriptions', component: SubscriptionsComponent},
      {path: 'subscriptions/:id', component: SubscriptionDetailsComponent},
      {path: '', redirectTo: 'admin', pathMatch: 'full'},
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRouting {
}
