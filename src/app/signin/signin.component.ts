import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/debounceTime';

import { environment } from '../../environments/environment';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
  providers: [AuthService]
})
export class SigninComponent implements OnInit {
  public form: FormGroup;
  public isProcessing: boolean = false;
  public googleAuthUrl = `${environment.endpoint}/auth/google`;
  public failedMessage: string;

  private _fail = new Subject<string>();
  private alertLength: number = 10000;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService) { }

  ngOnInit() {
    this._fail.subscribe(message => this.failedMessage = message);
    this._fail.debounceTime(this.alertLength).subscribe(() => this.failedMessage = null);

    this.authService.getSignedinUser()
      .then(user => {
        this.router.navigate(['/']);
      })
      .catch(error => {
        this.form = this.formBuilder.group({
          email: ['', [Validators.required]],
          password: ['', [Validators.required]],
          submit: ['Sign in']
        });
      });
  }

  public submit(form): void {
    this.isProcessing = true;
    if (this.form.status === 'INVALID') {
      this._fail.next('Sign in failed.');
      this.isProcessing = false;
      return;
    }
    this.authService.auth(form.value.email, form.value.password)
      .then(credential => {
        localStorage.setItem('token', credential.jwt);
        this.isProcessing = false;
        this.router.navigate(['/boxes']);
      })
      .catch(error => {
        this._fail.next('Sign in failed.');
        this.isProcessing = false;
      });
  }
}
