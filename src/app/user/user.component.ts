import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { BoxService, Box, User, Unit, Food } from '../services/box.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  public user: User;
  public boxes: Box[] = [];
  public units: Unit[] = [];

  constructor(private router: Router, private boxService: BoxService) { }

  ngOnInit() {
    this.boxService.getSignedinUser()
      .then(user => {
        this.user = user;
        return this.boxService.getBoxes();
      })
      .then(boxes => {
        this.boxes = boxes;
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
        return this.boxService.getBoxes();
      })
      .then(boxes => this.boxes = boxes);
  }

  public createBox(): void {
    this.router.navigate(['/boxes', 'new']);
  }
}
