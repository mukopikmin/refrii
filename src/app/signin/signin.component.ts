import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
  providers: [AuthService]
})
export class SigninComponent implements OnInit {
  public form: FormGroup;
  public isFailed: boolean = false;
  public isProcessing: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService) { }

  ngOnInit() {
    if (this.authService.verify()) {
      this.router.navigate(['/']);
    }
    this.form = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      submit: ['Sign in']
    });
  }

  public submit(form): void {
    this.isProcessing = true;
    if (this.form.status === 'INVALID') {
      this.isFailed = true;
      this.isProcessing = false;
      return;
    }
    this.authService.auth(form.value.email, form.value.password)
      .then(cred => {
        localStorage.setItem('id_token', cred.jwt);
        this.isProcessing = false;
        this.router.navigate(['/']);
      })
      .catch(error => {
        this.isFailed = true;
        this.isProcessing = false;
      });
  }
}
