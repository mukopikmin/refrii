import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { Box, BoxType } from '../models/box';
import { User } from '../models/user';
import { Unit } from '../models/unit';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css'],
  providers: [
    AuthService,
    UserService,
  ]
})
export class EditUserComponent implements OnInit {
  public user: User;
  public form: FormGroup;
  public isFailed: boolean;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private userService: UserService) { }

  ngOnInit() {
    this.authService.getSignedinUser()
      .then(user => {
        this.user = user;
        this.form = this.formBuilder.group({
          name: [user.name, [Validators.required]],
          email: [user.email, [Validators.required]],
          password: [],
          password_confirm: [],
          submit: ['Update account']
        });
      });
  }

  public submit(form): void {
    if (this.form.status === 'INVALID') {
      this.isFailed = true;
      return;
    }

    form.value.id = this.user.id;
    const user = User.parse(form.value);

    this.userService.update(user, form.value.password, form.value.password_confirm)
      .then(user => {
        this.router.navigate(['/user']);
      })
      .catch(error => { this.isFailed = true });
  }
}
