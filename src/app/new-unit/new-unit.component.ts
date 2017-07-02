import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';

import { UnitService } from '../services/unit.service';

@Component({
  selector: 'app-new-unit',
  templateUrl: './new-unit.component.html',
  styleUrls: ['./new-unit.component.css'],
  providers: [UnitService]
})
export class NewUnitComponent implements OnInit {
  public form: FormGroup;
  public failedMessage: string;

  private _fail = new Subject<string>();
  private alertLength: number = 10000;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private unitService: UnitService) { }

  ngOnInit() {
    this._fail.subscribe((message) => this.failedMessage = message);
    this._fail.debounceTime(this.alertLength).subscribe(() => this.failedMessage = null);

    this.form = this.formBuilder.group({
      label: ['', [Validators.required]],
      submit: ['Add new unit']
    });
  }

  public submit(form): void {
    if (this.form.status === 'INVALID') {
      this._fail.next('Unit label is required.');
      return;
    }
    const params = form.value;

    this.unitService.createUnit(params.label)
      .then(unit => this.router.navigate(['/user']))
      .catch(error => this._fail.next(error.json().message));
  }
}
