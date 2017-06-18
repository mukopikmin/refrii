import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-google-authorized',
  templateUrl: './google-authorized.component.html',
  styleUrls: ['./google-authorized.component.css']
})
export class GoogleAuthorizedComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.authService.googleAuth(params['state'], params['code']).then(credential => {
        localStorage.setItem('token', credential.jwt);
        this.router.navigate(['/boxes']);
      });
    });
  }
}
