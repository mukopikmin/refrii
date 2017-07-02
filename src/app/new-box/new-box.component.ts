import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/debounceTime';

import { BoxService } from '../services/box.service';

@Component({
  selector: 'app-new-box',
  templateUrl: './new-box.component.html',
  styleUrls: ['./new-box.component.css'],
  providers: [BoxService]
})
export class NewBoxComponent implements OnInit {
  public form: FormGroup;
  public failedMessage: string;

  private _fail = new Subject<string>();
  private alertLength: number = 10000;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private boxService: BoxService) { }

  ngOnInit() {
    this._fail.subscribe((message) => this.failedMessage = message);
    this._fail.debounceTime(this.alertLength).subscribe(() => this.failedMessage = null);

    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      notice: [],
      submit: ['Create new box']
    });
  }

  public submit(form): void {
    if (this.form.status === 'INVALID') {
      this._fail.next('Box name is required.');
      return;
    }
    const params = form.value;

    this.boxService.createBox(params.name, params.notice)
      .then(box => this.router.navigate(['/boxes', box.getId()]))
      .catch(error => this._fail.next(error.json().message));
  }
}
