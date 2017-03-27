import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { BoxService } from '../services/box.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
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
    this.boxService.signup(params.name, params.email, params.password, params.password_confirm)
      .then(user => {
        return this.boxService.auth(params.email, params.password);
      })
      .then(cred => {
        localStorage.setItem('id_token', cred.jwt);
        this.router.navigate(['/']);
      })
      .catch(error => {
        this.isFailed = true;;
      });
  }
}
