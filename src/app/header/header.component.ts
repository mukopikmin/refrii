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
    this.user = this.authService.getUserFromStorage();
  }

  public signout(): void {
    this.user = null;
    this.authService.signOut();
  }
}
