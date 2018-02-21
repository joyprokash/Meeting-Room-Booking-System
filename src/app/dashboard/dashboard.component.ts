import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {Router} from '@angular/router';
import { Http,Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit {
  peoples = []; name:any; email:any; id:any;
  constructor(private router: Router,private http: Http) { 
    
  }

  ngOnInit() {
    
    let headers = new Headers({ 'Content-Type':'application/json','Accept': 'application/json','Authorization': 'Bearer ' + window.localStorage.getItem('auth_key')});
    let options = new RequestOptions({ headers: headers });
    this.http.get('http://localhost/rest/api/user',options).map(res => res.json()).subscribe(people => {
      this.peoples = people;
      this.name = this.peoples['name'];
    });
  
  }

}
