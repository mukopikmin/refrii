import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Params, ActivatedRoute, Router } from '@angular/router';

import { AuthService } from '../services/auth.service';
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
    private authService: AuthService,
    private foodService: FoodService,
    private unitService: UnitService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.foodService.getFood(params['id'])
        .then(food => {
          this.food = food;
          return this.unitService.getUnits(this.food.box);
        })
        .then(units => {
          this.units = units
          this.form = this.formBuilder.group({
            name: [this.food.name, [Validators.required]],
            notice: [this.food.notice],
            unit: [this.food.unit.id, [Validators.required]],
            submit: ['Update food']
          });
        })
        .catch(error => this.authService.signOut());
    });
  }

  public submit(form): void {
    if (this.form.status === 'INVALID') {
      this.isFailed = true;
      return;
    }

    const food = Food.parse(form.value);
    food.expirationDate = this.food.expirationDate;
    food.id = this.food.id;
    food.amount = this.food.amount;
    food.unit = this.units.filter(_unit => {
      return _unit.id == form.value.unit;
    })[0];

    this.foodService.updateFood(food)
      .then(food => {
        this.router.navigate(['/foods', this.food.id]);
      })
      .catch(error => this.isFailed = true);
  }
}
