import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Params, ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/debounceTime';

import { BoxService } from '../services/box.service';
import { FoodService } from '../services/food.service';
import { UnitService } from '../services/unit.service';
import { Box } from '../models/box';
import { Unit } from '../models/unit';

@Component({
  selector: 'app-new-food',
  templateUrl: './new-food.component.html',
  styleUrls: ['./new-food.component.css'],
  providers: [
    BoxService,
    FoodService,
    UnitService
  ]
})
export class NewFoodComponent implements OnInit {
  public form: FormGroup;
  public units: Unit[] = [];
  public box: Box;
  public failedMessage: string;

  private _fail = new Subject<string>();
  private alertLength: number = 10000;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private datePipe: DatePipe,
    private boxService: BoxService,
    private foodService: FoodService,
    private unitService: UnitService) { }

  ngOnInit() {
    this._fail.subscribe((message) => this.failedMessage = message);
    this._fail.debounceTime(this.alertLength).subscribe(() => this.failedMessage = null);

    this.route.params.subscribe(params => {
      this.boxService.getBox(params['id'])
        .then(box => {
          this.box = box;
          return this.unitService.getUnits(this.box);
        })
        .then(units => this.units = units);
      this.form = this.formBuilder.group({
        name: ['', [Validators.required]],
        notice: [],
        amount: [0, [Validators.required]],
        expirationDate: [this.datePipe.transform(new Date(), 'yyyy-MM-dd'), [Validators.required]],
        unit: ['', [Validators.required]],
        image: [],
        submit: ['Add new food']
      });
    });
  }

  public submit(form): void {
    if (this.form.status === 'INVALID') {
      this._fail.next('Food name, amount and unit is required.');
      return;
    }
    const params = form.value;
    const unit = this.units.filter(unit => unit.id === Number(params.unit))[0];
    const date = new Date(params.expirationDate);

    this.foodService.createFood(params.name, params.notice, params.amount, date, unit, this.box, params.image)
      .then(food => this.router.navigate(['/boxes', this.box.id]))
      .catch(error => this._fail.next(error.json().message));
  }

  public upload(event: any) {
    this.form.patchValue({ image: event.target.files[0] });
  }
}
