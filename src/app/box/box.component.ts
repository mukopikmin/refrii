import { Component, OnInit } from '@angular/core';
import { Params, ActivatedRoute, Router } from '@angular/router';

import { BoxService } from '../services/box.service';
import { FoodService } from '../services/food.service';
import { Box } from '../models/box';
import { Food } from '../models/food';

@Component({
  selector: 'app-box',
  templateUrl: './box.component.html',
  styleUrls: ['./box.component.css'],
  providers: [
    BoxService,
    FoodService
  ]
})
export class BoxComponent implements OnInit {
  public box: Box;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private boxService: BoxService,
    private foodService: FoodService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.boxService.getBox(params['id']).then(box => this.box = box);
    });
  }

  public createFood(): void {
    this.router.navigate(['/boxes', this.box.getId(), 'foods', 'new']);
  }

  public removeFood(food: Food): void {
    this.foodService.removeFood(food)
      .then(() => {
        return this.boxService.getBox(this.box.getId())
      })
      .then(box => this.box = box);
  }

  public removeBox(): void {
    this.boxService.removeBox(this.box)
      .then(() => {
        this.router.navigate(['/boxes']);
      });
  }
}
