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
        const json = JSON.parse(localStorage.getItem('user'));
        if (json) {
          this.user = new User(json);
        }
      });
    }

  ngOnInit() { }

  public signout(): void {
    this.authService.signOut();
    this.user = null;
    this.router.navigate(['/signin']);
  }
}
