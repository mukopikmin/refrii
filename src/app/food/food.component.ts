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
  public failMessage: string;

  private success = new Subject<string>();
  private fail = new Subject<string>();
  private alertLength: number = 10000; // 10 seconds

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private decimalPipe: DecimalPipe,
    private datePipe: DatePipe,
    private modalService: NgbModal,
    private foodService: FoodService) { }

  ngOnInit() {
    this.success.subscribe((message) => this.successMessage = message);
    this.success.debounceTime(this.alertLength).subscribe(() => this.successMessage = null);

    this.fail.subscribe((message) => this.failMessage = message);
    this.fail.debounceTime(this.alertLength).subscribe(() => this.failMessage = null);

    this.route.params.subscribe(params => {
      this.foodService.getFood(params['id']).then(food => {
        this.food = food;

        const amount = this.decimalPipe.transform(this.food.amount, '1.0-1');
        const expirationDate = this.datePipe.transform(this.food.expirationDate, 'yyyy-MM-dd');

        this.form = this.formBuilder.group({
          amount: [amount, Validators.compose([Validators.required, notMinusValidator])],
          expirationDate: [expirationDate, null],
          needsAdding: [food.needsAdding, Validators.required]
        });
      });
    });
  }

  decrease(weight: number = 1) {
    this.food.decrement(weight);
    this.form.patchValue({
      amount: this.decimalPipe.transform(this.food.amount, '1.0-1')
    });
  }

  increase(weight: number = 1) {
    this.food.increment(weight);
    this.form.patchValue({
      amount: this.decimalPipe.transform(this.food.amount, '1.0-1')
    });
    this.form.patchValue({
      needsAdding: false
    });
  }

  preview() {
    const date = new Date(this.food.expirationDate.getTime());
    date.setDate(this.food.expirationDate.getDate() - 1);
    this.food.expirationDate = date;
    this.form.patchValue({
      expirationDate: this.datePipe.transform(date, 'yyyy-MM-dd')
    });
  }

  next() {
    const date = new Date(this.food.expirationDate.getTime());
    date.setDate(this.food.expirationDate.getDate() + 1);
    this.food.expirationDate = date;
    this.form.patchValue({
      expirationDate: this.datePipe.transform(date, 'yyyy-MM-dd')
    });
  }

  apply() {
    if (this.form.status === 'INVALID') {
      this.fail.next('Invalid value detected.');
      return;
    }

    this.food.needsAdding = this.form.value.needsAdding;
    this.food.expirationDate = this.form.value.expirationDate;
    this.food.amount = this.form.value.amount;

    this.foodService.updateFood(this.food)
    .then(food => {
      this.success.next(`Food '${this.food.name}' is successfully updated.`);
    })
    .catch(error => {
      this.success.next('Box name is required.');
    });
  }

  modal(content) {
    this.modalService.open(content).result.then((result) => {
      this.foodService.removeFood(this.food)
        .then(() => {
          this.router.navigate(['/boxes', this.food.box.id]);
        });
    })
    .catch(reason => {
      // Do nothing
    });
  }
}

function notMinusValidator(amountForm: FormControl) {
  if (amountForm.value < 0) {
    return { 'minusAmount': true };
  } else {
    return null;
  }
}
