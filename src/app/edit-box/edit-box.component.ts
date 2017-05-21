import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Params, ActivatedRoute, Router } from '@angular/router';

import { BoxService } from '../services/box.service';
import { Box } from '../models/box';

@Component({
  selector: 'app-edit-box',
  templateUrl: './edit-box.component.html',
  styleUrls: ['./edit-box.component.css'],
  providers: [BoxService]
})
export class EditBoxComponent implements OnInit {
  public form: FormGroup;
  public box: Box;
  public isFailed: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private boxService: BoxService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.boxService.getBox(params['id'])
        .then(box => {
          this.box = box;
          this.form = this.formBuilder.group({
            name: [this.box.getName(), [Validators.required]],
            notice: [this.box.getNotice()],
            submit: ['Update box']
          });
        });
    });
  }

  public submit(form): void {
    if (this.form.status === 'INVALID') {
      this.isFailed = true;
      return;
    }

    this.box.setName(form.controls['name'].value);
    this.box.setNotice(form.controls['notice'].value);

    this.boxService.updateBox(this.box)
      .then(box => {
        this.router.navigate(['/boxes', box.getId()]);
      })
      .catch(error => {
        this.isFailed = true;
      });
  }
}
