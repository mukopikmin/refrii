import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { BoxService, Box, User } from '../services/box.service';

@Component({
  selector: 'app-invite',
  templateUrl: './invite.component.html',
  styleUrls: ['./invite.component.css']
})
export class InviteComponent implements OnInit {
  public form: FormGroup;
  public box: Box;

  private isFailed: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private boxService: BoxService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.boxService.getBox(params['id']).then(box => {
        this.box = box;
      });
    });
    this.form = this.formBuilder.group({
      email: ['', [Validators.required]],
      submit: ['Invite user']
    });
  }

  public submit(form): void {
    if (this.form.status === 'INVALID') {
      this.isFailed = true;
      return;
    }

    this.boxService.getUserByEmail(form.value.email)
      .then(user => {
        return this.boxService.inviteUser(user, this.box);
      })
      .then(() => {
        this.router.navigate(['/user']);
      })
      .catch(error => console.log(error));
  }
}
