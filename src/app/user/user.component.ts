import { Component, OnInit } from '@angular/core';

import { BoxService, Unit } from '../services/box.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  public units: Unit[] = [];

  constructor(private boxService: BoxService) { }

  ngOnInit() {
    this.boxService.getUnits().then(units => this.units = units);
  }

}
