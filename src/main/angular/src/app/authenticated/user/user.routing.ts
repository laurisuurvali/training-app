import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ChatroomComponent} from './community/chatroom/chatroom.component';
import {HomepageComponent} from './homepage/homepage.component';
import {NutritionComponent} from './nutrition/nutrition.component';
import {TipArticleComponent} from './tips/tip-article/tip-article.component';
import {TipsComponent} from './tips/tips.component';
import {TrainingComponent} from './trainings/training.component';

const routes: Routes = [
  {
    path: '', children: [
      {path: 'homepage', component: HomepageComponent},
      {path: 'trainings', component: TrainingComponent},
      {path: 'nutrition', component: NutritionComponent},
      {path: 'tips', component: TipsComponent},
      {path: 'community', component: ChatroomComponent},
      {path: 'tips/:id', component: TipArticleComponent},
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRouting {
}
