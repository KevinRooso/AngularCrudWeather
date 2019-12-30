import { Component, OnInit } from '@angular/core';
import { LoginService } from  '../shared/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private logoutService : LoginService, private router : Router) { }

  ngOnInit() {
    this.logoutService.logout();
    this.router.navigate(['login']);
  }

}
