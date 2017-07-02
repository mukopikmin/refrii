import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';

import { environment } from '../../environments/environment';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  providers: [AuthService]
})
export class SignupComponent implements OnInit {
  public form: FormGroup;
  public failedMessage: string;

  private _fail = new Subject<string>();
  private alertLength: number = 10000;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService) { }

  ngOnInit() {
    this._fail.subscribe((message) => this.failedMessage = message);
    this._fail.debounceTime(this.alertLength).subscribe(() => this.failedMessage = null);

    this.authService.getSignedinUser()
      .then(user => {
        this.router.navigate(['/']);
      })
      .catch(error => {
        this.form = this.formBuilder.group({
          name: ['', [Validators.required]],
          email: ['', [Validators.required]],
          password: ['', [Validators.required]],
          password_confirm: ['', [Validators.required]],
          submit: ['Create account']
        });
      });
  }

  public submit(form): void {
    if (this.form.status === 'INVALID') {
      this._fail.next('All form should be filled correctly.');
      return;
    }
    const params = form.value;
    this.authService.signup(params.name, params.email, params.password, params.password_confirm)
      .then(user => {
        return this.authService.auth(params.email, params.password);
      })
      .then(cred => {
        localStorage.setItem('token', cred.jwt);
        this.router.navigate(['/']);
      })
      .catch(error => this._fail.next(error.json().message));
  }
}
