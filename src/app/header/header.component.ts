import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ElephantBoxService, User } from '../services/elephant-box.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [ElephantBoxService]
})
export class HeaderComponent implements OnInit {
  public user: User = null;

  constructor(
    private elephantBoxService: ElephantBoxService,
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
    this.elephantBoxService.getSignedinUser()
      .then(user => this.user = user)
      .catch(error => this.user = null);
  }

  public signout(): void {
    localStorage.removeItem('id_token');
    this.user = null;
    this.router.navigate(['/signin']);
  }
}
