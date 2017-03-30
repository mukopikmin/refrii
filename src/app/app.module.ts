import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { Http, RequestOptions } from '@angular/http';
import { DatePipe } from '@angular/common';

import { AppComponent } from './app.component';
import { BoxesComponent } from './boxes/boxes.component';
import { HeaderComponent } from './header/header.component';
import { SigninComponent } from './signin/signin.component';
import { BoxComponent } from './box/box.component';
import { AuthGuard } from './auth.guard';
import { BoxService } from './services/box.service';
import { SignupComponent } from './signup/signup.component';
import { UserComponent } from './user/user.component';
import { NewBoxComponent } from './new-box/new-box.component';
import { NewFoodComponent } from './new-food/new-food.component';
import { NewUnitComponent } from './new-unit/new-unit.component';

export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp(new AuthConfig(), http, options);
}

const routes: Routes = [
  {
    path: '',
    redirectTo: '/boxes',
    pathMatch: 'full'
  }, {
    path: 'user',
    component: UserComponent,
    canActivate: [AuthGuard]
  }, {
    path: 'signin',
    component: SigninComponent
  }, {
    path: 'signup',
    component: SignupComponent
  }, {
    path: 'units/new',
    component: NewUnitComponent,
    canActivate: [AuthGuard]
  }, {
    path: 'boxes',
    component: BoxesComponent,
    canActivate: [AuthGuard]
  }, {
    path: 'boxes/new',
    component: NewBoxComponent,
    canActivate: [AuthGuard]
  }, {
    path: 'boxes/:id',
    component: BoxComponent,
    canActivate: [AuthGuard]
  }, {
    path: 'boxes/:id/foods/new',
    component: NewFoodComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  declarations: [
    AppComponent,
    BoxesComponent,
    HeaderComponent,
    SigninComponent,
    BoxComponent,
    SignupComponent,
    UserComponent,
    NewBoxComponent,
    NewFoodComponent,
    NewUnitComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes, { useHash: true }),
    NgbModule.forRoot()
  ],
  providers: [
    AuthGuard,
    BoxService,
    {
      provide: AuthHttp,
      useFactory: authHttpServiceFactory,
      deps: [Http, RequestOptions]
    },
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
