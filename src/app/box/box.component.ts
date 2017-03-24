import { Component, OnInit } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';

import { BoxService, Box} from '../services/box.service';

@Component({
  selector: 'app-box',
  templateUrl: './box.component.html',
  styleUrls: ['./box.component.css'],
  providers: [BoxService]
})
export class BoxComponent implements OnInit {
  public box: Box;

  private id: number;

  constructor(private route: ActivatedRoute, private boxService: BoxService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
    this.boxService.getBox(this.id).then(box => {
      this.box = box;
    })
  }

}