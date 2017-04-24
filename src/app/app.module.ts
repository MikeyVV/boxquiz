import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {RouterModule, Routes} from '@angular/router';

import { AppComponent } from './app.component';
import { SidebarComponent } from './home/sidebar/sidebar.component';
import { QuizCategoryComponent } from './home/quiz-category/quiz-category.component';
import { NavbarComponent } from './home/navbar/navbar.component';
import { SigninComponent } from './signin/signin.component';
import {FacebookModule} from 'ngx-facebook';
import { QuizComponent } from './home/quiz/quiz.component';
import { HomeComponent } from './home/home.component';

const appRoutes: Routes = [
  { path: '', component: AppComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'boxquiz', component: HomeComponent , children: [
    { path: '', component: QuizCategoryComponent },
    { path: 'quiz/:cate', component: QuizComponent },
  ]},
];

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    QuizCategoryComponent,
    NavbarComponent,
    SigninComponent,
    QuizComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    FacebookModule.forRoot(),
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
