import { Component, OnInit } from '@angular/core';
import { User } from './models/user';
import { Router } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  currentUser: User;
  constructor(private router: Router, private authService: AuthenticationService){}
  ngOnInit() {
    this.authService.currentUser$.subscribe(user => this.currentUser = user);
  }
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
