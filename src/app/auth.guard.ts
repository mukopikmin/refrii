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
    return this.authService.getSignedinUser()
      .then(user => {
        return true;
      })
      .catch(error => {
        localStorage.removeItem('token');
        this.router.navigate(['/signin']);
        return false;
      });
  }
}
