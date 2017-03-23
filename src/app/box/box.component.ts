import { Component, OnInit } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';

import { ElephantBoxService, Box} from '../services/elephant-box.service';

@Component({
  selector: 'app-box',
  templateUrl: './box.component.html',
  styleUrls: ['./box.component.css'],
  providers: [ElephantBoxService]
})
export class BoxComponent implements OnInit {
  public box: Box;

  private id: number;

  constructor(private route: ActivatedRoute, private elephantBoxService: ElephantBoxService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
    this.elephantBoxService.getBox(this.id).then(box => {
      this.box = box;
    })
  }

}
