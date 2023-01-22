import { EventEmitter, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth-service.service';


@Injectable({
  providedIn: 'root'
})
export class AutenticadoGuard implements CanActivate {
  mostrarNav = new EventEmitter<boolean>();

  constructor(
    private authService: AuthService,
    private router:Router
    ) {}

    //public authService: AuthService = new AuthService(this.http, this.router);

       canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return this.authService.isAuthenticated();

  }
}
