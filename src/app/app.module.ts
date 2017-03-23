import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { Http, RequestOptions } from '@angular/http';

import { AppComponent } from './app.component';
import { BoxesComponent } from './boxes/boxes.component';
import { HeaderComponent } from './header/header.component';
import { SigninComponent } from './signin/signin.component';
import { BoxComponent } from './box/box.component';
import { AuthGuard } from './auth.guard';
import { ElephantBoxService } from './services/elephant-box.service';
import { SignupComponent } from './signup/signup.component';

function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp(new AuthConfig(), http, options);
}

const routes: Routes = [
  {
    path: '',
    redirectTo: '/boxes',
    pathMatch: 'full'
  }, {
    path: 'signin',
    component: SigninComponent
  }, {
    path: 'signup',
    component: SignupComponent
  }, {
    path: 'boxes',
    component: BoxesComponent,
    canActivate: [AuthGuard]
  }, {
    path: 'boxes/:id',
    component: BoxComponent,
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
    SignupComponent
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
    ElephantBoxService,
    {
      provide: AuthHttp,
      useFactory: authHttpServiceFactory,
      deps: [Http, RequestOptions]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
