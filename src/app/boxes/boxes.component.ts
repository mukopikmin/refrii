import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../services/auth.service';
import { BoxService } from '../services/box.service';
import { Box } from '../models/box';

@Component({
  selector: 'app-boxes',
  templateUrl: './boxes.component.html',
  styleUrls: ['./boxes.component.css'],
  providers: [
    AuthService,
    BoxService
  ]
})
export class BoxesComponent implements OnInit {
  public boxes: Box[];
  public today: Date = new Date();

  constructor(
    private router: Router,
    private authService: AuthService,
    private boxService: BoxService) { }

  ngOnInit() {
    this.boxService.getBoxes()
      .then(boxes => {
        this.boxes = boxes;
        this.boxes.forEach(box => {
          if (box.imageUrl) {
            this.boxService.getImage(box).then(image => {
              box.base64image = `data:${image.content_type};base64,${image.base64}`;
            });
          }
        });
      })
      .catch(error => this.authService.signOut());
  }

  public createBox(): void {
    this.router.navigate(['/boxes', 'new'])
  }
}
