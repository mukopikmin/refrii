import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Params, ActivatedRoute, Router } from '@angular/router';

import { BoxService, Box, Unit } from '../services/box.service';

@Component({
  selector: 'app-new-food',
  templateUrl: './new-food.component.html',
  styleUrls: ['./new-food.component.css']
})
export class NewFoodComponent implements OnInit {
  public form: FormGroup;
  public units: Unit[] = [];
  public box: Box;

  private isFailed: boolean = false;
  private id: number;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private boxService: BoxService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
    this.boxService.getUnits().then(units => this.units = units);
    this.boxService.getBox(this.id).then(box => this.box = box);
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      notice: [],
      amount: [],
      expirationDate: [],
      unit: [],
      submit: ['Add new food']
    });
  }

  public submit(form): void {
    if (this.form.status === 'INVALID') {
      this.isFailed = true;
      return;
    }
    const params = form.value;
    const unit = this.units.filter(unit => unit.getId() === Number(params.unit))[0];
    const date = new Date(params.expirationDate);

    this.boxService.createFood(params.name, params.notice, params.amount, date, unit, this.box)
      .then(food => {
        this.router.navigate(['/boxes', this.box.getId()]);
      })
      .catch(error => {
        this.isFailed = true;
      });
  }
}
