import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { BoxService, Box } from '../services/box.service';

@Component({
  selector: 'app-boxes',
  templateUrl: './boxes.component.html',
  styleUrls: ['./boxes.component.css'],
  providers: [BoxService]
})
export class BoxesComponent implements OnInit {
  public boxes: Box[] = [];

  constructor(
    private router: Router,
    private boxService: BoxService) { }

  ngOnInit() {
    this.boxService.getBoxes()
      .then(boxes => {
        this.boxes = boxes;
      });
  }

  public createBox(): void {
    this.router.navigate(['/boxes', 'new'])
  }
}
