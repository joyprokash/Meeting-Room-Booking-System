import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'logout',
  template: ''
})
export class LogoutComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    window.localStorage.removeItem('auth_key');
    this.router.navigateByUrl('/login');
  }

 

}
