// import { Injectable } from '@angular/core';
// import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
// import { Observable } from 'rxjs/Observable';
//
// @Injectable()
// export class AuthGuard implements CanActivate {
//   canActivate(
//     next: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
//     return true;
//   }
// }

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate } from '@angular/router';

import { BoxService } from './services/box.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private boxService: BoxService) { }

  canActivate() {
    if(this.boxService.verify()) {
      return true;
    } else {
      this.router.navigate(['/signin']);
      return false;
    }
  }
}
