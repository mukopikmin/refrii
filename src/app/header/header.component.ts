import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { BoxService, User } from '../services/box.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [BoxService]
})
export class HeaderComponent implements OnInit {
  public user: User = null;

  constructor(
    private boxService: BoxService,
    private router: Router) {
      this.router.events.subscribe(route => {
        if (this.user === null) {
          this.bindUser();
        }
      });
    }

  ngOnInit() {
    this.bindUser();
  }

  private bindUser(): void {
    this.boxService.getSignedinUser()
      .then(user => this.user = user)
      .catch(error => this.user = null);
  }

  public signout(): void {
    localStorage.removeItem('id_token');
    this.user = null;
    this.router.navigate(['/signin']);
  }
}
