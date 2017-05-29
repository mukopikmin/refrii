import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Params, ActivatedRoute, Router } from '@angular/router';

import { FoodService } from '../services/food.service';
import { UnitService } from '../services/unit.service';
import { Unit } from '../models/unit';
import { Food } from '../models/food';

@Component({
  selector: 'app-edit-food',
  templateUrl: './edit-food.component.html',
  styleUrls: ['./edit-food.component.css'],
  providers: [
    FoodService,
    UnitService
  ]
})
export class EditFoodComponent implements OnInit {
  public form: FormGroup;
  public units: Unit[] = [];
  public food: Food;
  public isFailed: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private foodService: FoodService,
    private unitService: UnitService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.foodService.getFood(params['id'])
      .then(food => {
        this.food = food;
        return this.unitService.getUnits(this.food.getBox());
      })
      .then(units => {
        this.units = units
        this.form = this.formBuilder.group({
          name: [this.food.getName(), [Validators.required]],
          notice: [this.food.getNotice()],
          unit: [this.food.getUnit().getId(), [Validators.required]],
          submit: ['Update food']
        });
      });
    });
  }

  public submit(form): void {
    if (this.form.status === 'INVALID') {
      this.isFailed = true;
      return;
    }

    const food = new Food(form.value);
    food.setExpirationDate(this.food.getExpirationDate());
    food.setId(this.food.getId());
    food.setAmount(this.food.getAmount());
    food.setUnit(this.units.filter(unit => {
      return unit.getId() == form.value.unit;
    })[0]);

    this.foodService.updateFood(food)
      .then(food => {
        this.router.navigate(['/foods', this.food.getId()]);
      })
      .catch(error => this.isFailed = true);
  }
}
