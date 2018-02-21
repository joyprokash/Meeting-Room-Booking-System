import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {NgForm} from '@angular/forms';
import { Http,Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import {Router} from '@angular/router';

import 'rxjs/Rx';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {
  token:any;  errors:any; username:any; password:any;showloader:any
  
  constructor(private http: Http,private router: Router){
    this.showloader = 'false';
  }
  tokens =[];

  
  ngOnInit() {
    
  }

  

  onSubmitForm(f: NgForm) {
    this.showloader = 'true';
    const values = { grant_type: 'password', client_id: '2',client_secret:'ZteAdXQbKLfFDfn0riZIY0lg5fQEvH5BUSQ63iz1',scope:'*' };
    var formdata = f.value;
    var merged = Object.assign(values, formdata);
    let headers = new Headers({ 'Content-Type':'application/json','Accept': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    this.http.post('http://localhost/rest/oauth/token', JSON.stringify(merged), options).map(res => res.json())
    .subscribe((data)=>{
      if(data.access_token){
        window.localStorage.setItem('auth_key',data.access_token);
        this.showloader = 'false';
        this.router.navigateByUrl('/dashboard');
      }
    },
    err => {
      this.errors = "Username password not matched";
      this.showloader = 'false';
    });
    
    
  }

}
