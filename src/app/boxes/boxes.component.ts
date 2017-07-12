import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { BoxService } from '../services/box.service';
import { Box } from '../models/box';

@Component({
  selector: 'app-boxes',
  templateUrl: './boxes.component.html',
  styleUrls: ['./boxes.component.css'],
  providers: [BoxService]
})
export class BoxesComponent implements OnInit {
  public boxes: Box[];

  constructor(
    private router: Router,
    private boxService: BoxService) { }

  ngOnInit() {
    this.boxService.getBoxes().then(boxes => {
      this.boxes = boxes;
      this.boxes.forEach(box => {
        if (box.getImageUrl()) {
          this.boxService.getImage(box).then(image => {
              box.setBase64image(`data:${image.content_type};base64,${image.base64}`);
          });
        }
      });
    });
  }

  public createBox(): void {
    this.router.navigate(['/boxes', 'new'])
  }
}
