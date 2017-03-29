import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { BoxService } from '../services/box.service';

@Component({
  selector: 'app-new-food',
  templateUrl: './new-food.component.html',
  styleUrls: ['./new-food.component.css']
})
export class NewFoodComponent implements OnInit {
  public form: FormGroup;

  private isFailed: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private boxService: BoxService) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      amount: [],
      expirationDate: [],
      notice: [],
      submit: ['Add new food']
    });
  }

  public submit(form): void {
    if (this.form.status === 'INVALID') {
      this.isFailed = true;
      return;
    }
    const params = form.value;

    this.boxService.createBox(params.name, params.notice)
      .then(box => {
        this.router.navigate(['/boxes', box.getId()]);
      })
      .catch(error => {
        this.isFailed = true;
      });
  }
}
