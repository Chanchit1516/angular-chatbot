import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenStorageService } from '../services/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router,
              private tokenStorageService: TokenStorageService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.tokenStorageService.getUser()) {
        // logged in so return true
        return true;
    }
    // not logged in so redirect to login page with the return url and return false
    this.router.navigate(['login'], { queryParams: { returnUrl: state.url }});
    return false;
}
  
}
