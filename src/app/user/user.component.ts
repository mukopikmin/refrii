import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../services/auth.service';
import { BoxService } from '../services/box.service';
import { UnitService } from '../services/unit.service';
import { Box, BoxType } from '../models/box';
import { User } from '../models/user';
import { Unit } from '../models/unit';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  providers: [
    AuthService,
    BoxService,
    UnitService
  ]
})
export class UserComponent implements OnInit {
  public user: User;
  public ownBoxes: Box[] = [];
  public invitedBoxes: Box[] = [];
  public units: Unit[] = [];

  constructor(
    private router: Router,
    private authService: AuthService,
    private boxService: BoxService,
    private unitService: UnitService) { }

  ngOnInit() {
    this.authService.getSignedinUser()
      .then(user => {
        this.user = user;
        return Promise.all([
          this.boxService.getBoxes(BoxType.Owns),
          this.boxService.getBoxes(BoxType.Invited)
        ]);
      })
      .then(result => {
        this.ownBoxes = result[0];
        this.invitedBoxes = result[1];
      });
    this.unitService.getUnits().then(units => this.units = units);
  }

  public removeUnit(unit: Unit): void {
    this.unitService.removeUnit(unit)
      .then(() => {
        return this.unitService.getUnits();
      })
      .then(units => this.units = units);
  }

  public createUnit(): void {
    this.router.navigate(['/units', 'new']);
  }

  public removeBox(box: Box): void {
    this.boxService.removeBox(box)
      .then(() => {
        return Promise.all([
          this.boxService.getBoxes(BoxType.Owns),
          this.boxService.getBoxes(BoxType.Invited)
        ]);
      })
      .then(result => {
        this.ownBoxes = result[0];
        this.invitedBoxes = result[1];
      });
  }

  public createBox(): void {
    this.router.navigate(['/boxes', 'new']);
  }

  public invite(box: Box): void {
    this.router.navigate(['/boxes', box.getId(), 'invite']);
  }
}
