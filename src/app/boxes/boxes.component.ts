import { Component, OnInit } from '@angular/core';

import { BoxService, Box } from '../services/box.service';

@Component({
  selector: 'app-boxes',
  templateUrl: './boxes.component.html',
  styleUrls: ['./boxes.component.css'],
  providers: [BoxService]
})
export class BoxesComponent implements OnInit {
  public boxes: Box[] = [];

  constructor(private boxService: BoxService) { }

  ngOnInit() {
    this.boxService.getBoxes()
      .then(boxes => {
        this.boxes = boxes;
      });
  }

}
