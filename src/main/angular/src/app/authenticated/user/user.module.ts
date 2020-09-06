import {CommonModule, registerLocaleData} from '@angular/common';
import localeEe from '@angular/common/locales/et';
import {LOCALE_ID, NgModule} from '@angular/core';
import {TokenStorageService} from '../../_services/security/token-storage.service';
import {MessagingService} from '../../_services/user/messaging.service';
import {SharedModule} from '../../shared/shared.module';
import {ChatFormComponent} from './community/chat-form/chat-form.component';
import {ChatroomComponent} from './community/chatroom/chatroom.component';
import {FeedComponent} from './community/feed/feed.component';
import {MessageComponent} from './community/message/message.component';
import {HomepageComponent} from './homepage/homepage.component';
import {MealComponent} from './nutrition/meal/meal.component';
import {NutritionComponent} from './nutrition/nutrition.component';
import {TipArticleComponent} from './tips/tip-article/tip-article.component';
import {TipsComponent} from './tips/tips.component';
import {ExerciseComponent} from './trainings/exercise/exercise.component';
import {InstructionComponent} from './trainings/instruction/instruction.component';
import {TrainingComponent} from './trainings/training.component';
import {UserRouting} from './user.routing';

registerLocaleData(localeEe);

@NgModule({
  declarations: [
    HomepageComponent,
    InstructionComponent,
    NutritionComponent,
    TipsComponent,
    TrainingComponent,
    TipArticleComponent,
    ExerciseComponent,
    MealComponent,
    ChatFormComponent,
    ChatroomComponent,
    FeedComponent,
    MessageComponent
  ],
  imports: [
    CommonModule,
    UserRouting,
    SharedModule,
  ],
  exports: [
    ExerciseComponent,
    MealComponent,
    InstructionComponent
  ],
  providers: [
    MessagingService,
    TokenStorageService,
    {
      provide: LOCALE_ID, useValue: 'et-EE'
    }
  ],
})
export class UserModule {
}
