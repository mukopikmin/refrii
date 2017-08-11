import { Component, OnInit } from '@angular/core';
import { Params, ActivatedRoute, Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { BoxService } from '../services/box.service';
import { FoodService } from '../services/food.service';
import { AuthService } from '../services/auth.service';
import { Box } from '../models/box';
import { Food } from '../models/food';

@Component({
  selector: 'app-box',
  templateUrl: './box.component.html',
  styleUrls: ['./box.component.css'],
  providers: [
    AuthService,
    BoxService,
    FoodService
  ]
})
export class BoxComponent implements OnInit {
  public box: Box;
  public query: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private modalService: NgbModal,
    private authService: AuthService,
    private boxService: BoxService,
    private foodService: FoodService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.boxService.getBox(params['id'])
        .then(box => {
          this.box = box;
          this.box.foods.forEach(food => {
            if (food.imageUrl) {
              this.foodService.getImage(food)
                .then(image => {
                  food.base64image = `data:${image.content_type};base64,${image.base64}`;
                });
            }
          });
        })
        .catch(error => this.authService.signOut());
    });
  }

  createFood(): void {
    this.router.navigate(['/boxes', this.box.id, 'foods', 'new']);
  }

  removeFood(food: Food): void {
    this.foodService.removeFood(food)
      .then(() => {
        return this.boxService.getBox(this.box.id);
      })
      .then(box => this.box = box)
      .catch(error => this.authService.signOut());
  }

  queryChange(event: any) {
    this.query = event.target.value;
  }

  modal(content) {
    this.modalService.open(content).result.then(result => {
      this.boxService.removeBox(this.box)
        .then(() => this.router.navigate(['/boxes']))
        .catch(error => this.authService.signOut());
    })
    .catch(reason => {
      // Do nothing
    });
  }
}
