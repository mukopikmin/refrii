import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate } from '@angular/router';

import { AuthService } from './services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private authService: AuthService) { }

  canActivate() {
    if (this.authService.getUserFromStorage()) {
      return true;
    } else {
      this.authService.signOut();
      this.router.navigate(['/signin']);
      return false;
    }
  }
}
