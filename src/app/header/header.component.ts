import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../services/auth.service';
import { User } from '../models/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [AuthService]
})
export class HeaderComponent implements OnInit {
  public user: User;

  constructor(
    private authService: AuthService,
    private router: Router) {
      this.router.events.subscribe(route => {
        if (!this.user) {
          this.bindUser();
        }
      });
    }

  ngOnInit() {
    this.bindUser();
  }

  private bindUser(): void {
    this.authService.getSignedinUser()
      .then(user => this.user = user)
      .catch(error => this.user = null);
  }

  public signout(): void {
    localStorage.removeItem('id_token');
    this.user = null;
    this.router.navigate(['/signin']);
  }
}
