import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ResgisterComponent } from './resgister/resgister.component';
import { QuizComponent } from './quiz/quiz.component';
import { ResultComponent } from './result/result.component';
import { AuthGuard } from './auth/auth.guard';


const routes: Routes = [
  { path: 'register', component: ResgisterComponent },
  { path: 'quiz', component: QuizComponent, canActivate: [AuthGuard] },
  { path: 'result', component: ResultComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/register', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
