import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { BoxService, Box, User, Unit, Food, BoxType } from '../services/box.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  public user: User;
  public ownBoxes: Box[] = [];
  public invitedBoxes: Box[] = [];
  public units: Unit[] = [];

  constructor(private router: Router, private boxService: BoxService) { }

  ngOnInit() {
    this.boxService.getSignedinUser()
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
    this.boxService.getUnits().then(units => this.units = units);
  }

  public removeUnit(unit: Unit): void {
    this.boxService.removeUnit(unit)
      .then(() => {
        return this.boxService.getUnits();
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
}
