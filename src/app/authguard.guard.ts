import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {Router} from '@angular/router';

@Injectable()
export class AuthguardGuard implements CanActivate {
  auth_key: any;
  constructor(private router: Router){  }
  canActivate(next: ActivatedRouteSnapshot,state: RouterStateSnapshot):  boolean {
      if(window.localStorage.getItem('auth_key')==null){
        this.router.navigateByUrl('/login');
        return false;
       }else{
        return true;
      }
      
  }
}
