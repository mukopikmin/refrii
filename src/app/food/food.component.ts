import { Component, OnInit } from '@angular/core';
import { Params, ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { DecimalPipe, DatePipe } from '@angular/common';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/debounceTime';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { FoodService } from '../services/food.service';
import { Food } from '../models/food';

@Component({
  selector: 'app-food',
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.css'],
  providers: [
    DecimalPipe,
    FoodService
  ]
})
export class FoodComponent implements OnInit {
  public food: Food;
  public form: FormGroup;
  public successMessage: string;

  private _success = new Subject<string>();
  private alertLength: number = 10000;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private decimalPipe: DecimalPipe,
    private datePipe: DatePipe,
    private modalService: NgbModal,
    private foodService: FoodService) { }

  ngOnInit() {
    this._success.subscribe((message) => this.successMessage = message);
    this._success.debounceTime(this.alertLength).subscribe(() => this.successMessage = null);

    this.route.params.subscribe(params => {
      this.foodService.getFood(params['id']).then(food => {
        this.food = food;

        const amount = this.decimalPipe.transform(this.food.getAmount(), '1.0-1');
        const expirationDate = this.datePipe.transform(this.food.getExpirationDate(), 'yyyy-MM-dd');

        this.form = this.formBuilder.group({
          amount: [amount, Validators.required],
          expirationDate: [expirationDate, null],
          needsAdding: [food.isNeedsAdding(), Validators.required]
        });
      });
    });
  }

  decrease(weight: number = 1) {
    this.food.decrement(weight);
    this.form.patchValue({
      amount: this.decimalPipe.transform(this.food.getAmount(), '1.0-1')
    });
  }

  increase(weight: number = 1) {
    this.food.increment(weight);
    this.form.patchValue({
      amount: this.decimalPipe.transform(this.food.getAmount(), '1.0-1')
    });
  }

  apply() {
    this.food.setNeedsAdding(this.form.value.needsAdding);
    this.foodService.updateFood(this.food).then(food => {
      this._success.next(`Food '${this.food.getName()}' is successfully updated.`);
    });
  }

  preview() {
    const date = new Date(this.food.getExpirationDate().getTime());
    date.setDate(this.food.getExpirationDate().getDate() - 1);
    this.food.setExpirationDate(date);
    this.form.patchValue({
      expirationDate: this.datePipe.transform(date, 'yyyy-MM-dd')
    });
  }

  next() {
    const date = new Date(this.food.getExpirationDate().getTime());
    date.setDate(this.food.getExpirationDate().getDate() + 1);
    this.food.setExpirationDate(date);
    this.form.patchValue({
      expirationDate: this.datePipe.transform(date, 'yyyy-MM-dd')
    });
  }

  modal(content) {
    this.modalService.open(content).result.then((result) => {
      this.foodService.removeFood(this.food)
        .then(() => {
          this.router.navigate(['/boxes', this.food.getBox().getId()]);
        });
    })
    .catch(reason => {
      // Do nothing
    });
  }
}
