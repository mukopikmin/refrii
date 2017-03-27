import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { BoxService } from '../services/box.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
  providers: [BoxService]
})
export class SigninComponent implements OnInit {
  public form: FormGroup;

  private isFailed: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private boxService: BoxService) { }

  ngOnInit() {
    if (this.boxService.verify()) {
      this.router.navigate(['/']);
    }
    this.form = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      submit: ['Sign in']
    });
  }

  public submit(form): void {
    if (this.form.status === 'INVALID') {
      this.isFailed = true;
      return;
    }
    this.boxService.auth(form.value.email, form.value.password)
      .then(cred => {
        localStorage.setItem('id_token', cred.jwt);
        this.router.navigate(['/']);
      })
      .catch(error => {
        this.isFailed = true;;
      });
  }
}
