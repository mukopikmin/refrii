import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { BoxService } from '../services/box.service';

@Component({
  selector: 'app-new-unit',
  templateUrl: './new-unit.component.html',
  styleUrls: ['./new-unit.component.css']
})
export class NewUnitComponent implements OnInit {
  public form: FormGroup;

  private isFailed: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private boxService: BoxService) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      label: ['', [Validators.required]],
      submit: ['Add new unit']
    });
  }

  public submit(form): void {
    if (this.form.status === 'INVALID') {
      this.isFailed = true;
      return;
    }
    const params = form.value;

    this.boxService.createUnit(params.name)
      .then(unit => {
        this.router.navigate(['/user']);
      })
      .catch(error => {
        this.isFailed = true;
      });
  }
}
