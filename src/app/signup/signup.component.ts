import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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

  private isFailed: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService) { }

  ngOnInit() {
    if (this.authService.verify()) {
      this.router.navigate(['/']);
    }
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      password_confirm: ['', [Validators.required]],
      submit: ['Create account']
    });
  }

  public submit(form): void {
    if (this.form.status === 'INVALID') {
      this.isFailed = true;
      return;
    }
    const params = form.value;
    this.authService.signup(params.name, params.email, params.password, params.password_confirm)
      .then(user => {
        return this.authService.auth(params.email, params.password);
      })
      .then(cred => {
        localStorage.setItem('id_token', cred.jwt);
        this.router.navigate(['/']);
      })
      .catch(error => { this.isFailed = true });
  }
}
