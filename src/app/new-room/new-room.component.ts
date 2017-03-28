import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Params, ActivatedRoute, Router } from '@angular/router';

import { BoxService, Box } from '../services/box.service';

@Component({
  selector: 'app-new-room',
  templateUrl: './new-room.component.html',
  styleUrls: ['./new-room.component.css']
})
export class NewRoomComponent implements OnInit {
  public form: FormGroup;
  public box: Box;

  private id: number;

  private isFailed: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private boxService: BoxService) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      notice: [],
      submit: ['Create new room']
    });
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
    this.boxService.getBox(this.id).then(box => {
      this.box = box;
    });
  }

  public submit(form): void {
    if (this.form.status === 'INVALID') {
      this.isFailed = true;
      return;
    }
    const params = form.value;

    this.boxService.createRoom(params.name, params.notice, this.box)
      .then(room => {
        this.router.navigate(['/boxes', this.box.getId()]);
      })
      .catch(error => {
        this.isFailed = true;
      });
  }
}
