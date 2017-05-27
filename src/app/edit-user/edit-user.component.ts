import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../services/auth.service';
import { BoxService } from '../services/box.service';
import { UnitService } from '../services/unit.service';
import { Box, BoxType } from '../models/box';
import { User } from '../models/user';
import { Unit } from '../models/unit';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css'],
  providers: [
    AuthService,
    BoxService,
    UnitService
  ]
})
export class EditUserComponent implements OnInit {
  public user: User;
  public form: FormGroup;

  constructor(
    private router: Router,
    private authService: AuthService,
    private boxService: BoxService,
    private unitService: UnitService) { }

  ngOnInit() {
    this.authService.getSignedinUser()
      .then(user => {
        this.user = user;
      });
  }

}
