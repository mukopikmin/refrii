import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ElephantBoxService } from '../services/elephant-box.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
  providers: [ElephantBoxService]
})
export class SigninComponent implements OnInit {
  public form: FormGroup;

  private isFailed: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private elephantBoxService: ElephantBoxService) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: []
    });
  }

  public submit(form): void {
    if (this.form.status === 'INVALID') {
      this.isFailed = true;
      return;
    }
    this.elephantBoxService.auth(form.value.email, form.value.password)
      .then(cred => {
        localStorage.setItem('id_token', cred.jwt);
        this.router.navigate(['/']);
      })
      .catch(error => {
        this.isFailed = true;;
      });
  }
}
