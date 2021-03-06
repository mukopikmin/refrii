import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { Http, RequestOptions } from '@angular/http';
import { DatePipe } from '@angular/common';
import { Angular2FontawesomeModule } from 'angular2-fontawesome/angular2-fontawesome';
import { NewlinesPipe } from 'angular-pipes/src/string/newlines.pipe';

import { AuthService } from './services/auth.service';
import { AuthGuard } from './auth.guard';

import { AppComponent } from './app.component';
import { BoxesComponent } from './boxes/boxes.component';
import { HeaderComponent } from './header/header.component';
import { SigninComponent } from './signin/signin.component';
import { BoxComponent } from './box/box.component';
import { SignupComponent } from './signup/signup.component';
import { UserComponent } from './user/user.component';
import { NewBoxComponent } from './new-box/new-box.component';
import { NewFoodComponent } from './new-food/new-food.component';
import { NewUnitComponent } from './new-unit/new-unit.component';
import { InviteComponent } from './invite/invite.component';
import { FoodComponent } from './food/food.component';
import { EditBoxComponent } from './edit-box/edit-box.component';

import { InvitedBoxesPipe } from './pipes/invited-boxes.pipe';
import { EditUserComponent } from './edit-user/edit-user.component';
import { EditFoodComponent } from './edit-food/edit-food.component';
import { GoogleAuthorizedComponent } from './google-authorized/google-authorized.component';
import { FoodOrderPipe } from './pipes/food-order.pipe';
import { FoodFilterPipe } from './pipes/food-filter.pipe';
import { TermsofserviceComponent } from './termsofservice/termsofservice.component';
import { PrivacypolicyComponent } from './privacypolicy/privacypolicy.component';

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
    path: 'user/edit',
      component: EditUserComponent,
      canActivate: [AuthGuard]
    }, {
    path: 'signin',
    component: SigninComponent
  }, {
    path: 'signup',
    component: SignupComponent
  }, {
    path: 'google/authorized',
    component: GoogleAuthorizedComponent
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
    path: 'boxes/:id/edit',
    component: EditBoxComponent,
    canActivate: [AuthGuard]
  }, {
    path: 'boxes/:id/invite',
    component: InviteComponent,
    canActivate: [AuthGuard]
  }, {
    path: 'boxes/:id/foods/new',
    component: NewFoodComponent,
    canActivate: [AuthGuard]
  }, {
    path: 'foods/:id',
    component: FoodComponent,
    canActivate: [AuthGuard]
  }, {
    path: 'foods/:id/edit',
    component: EditFoodComponent,
    canActivate: [AuthGuard]
  }, {
    path: 'privacypolicy',
    component: PrivacypolicyComponent
  }, {
    path: 'termsofservice',
    component: TermsofserviceComponent
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
    NewUnitComponent,
    InviteComponent,
    FoodComponent,
    EditBoxComponent,
    InvitedBoxesPipe,
    EditUserComponent,
    EditFoodComponent,
    GoogleAuthorizedComponent,
    NewlinesPipe,
    FoodOrderPipe,
    FoodFilterPipe,
    TermsofserviceComponent,
    PrivacypolicyComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    Angular2FontawesomeModule,
    RouterModule.forRoot(routes),
    NgbModule.forRoot()
  ],
  providers: [
    AuthGuard,
    AuthService,
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
