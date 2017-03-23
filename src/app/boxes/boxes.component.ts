import { Component, OnInit } from '@angular/core';

import { ElephantBoxService, Box } from '../services/elephant-box.service';

@Component({
  selector: 'app-boxes',
  templateUrl: './boxes.component.html',
  styleUrls: ['./boxes.component.css'],
  providers: [ElephantBoxService]
})
export class BoxesComponent implements OnInit {
  public boxes: Box[] = [];

  constructor(private elephantBoxService: ElephantBoxService) { }

  ngOnInit() {
    this.elephantBoxService.getBoxes()
      .then(boxes => {
        this.boxes = boxes;
      });
  }

}
