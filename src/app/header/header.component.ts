import { Component, AfterContentChecked } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../services/auth.service';
import { User } from '../models/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [AuthService]
})
export class HeaderComponent implements AfterContentChecked {
  public user: User;

  constructor(
    private authService: AuthService,
    private router: Router) { }

  ngAfterContentChecked() {
    const json = JSON.parse(localStorage.getItem('user'));
    if (json) {
      this.user = User.parse(json);
    }
  }

  public signout(): void {
    this.authService.signOut();
    this.user = null;
    this.router.navigate(['/signin']);
  }
}
