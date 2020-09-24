import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenService } from '../token.service';

@Injectable({
  providedIn: 'root'
})
export class LogisticaGuard implements CanActivate {

  constructor(
    private router: Router,
    private TokenService: TokenService
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      const rol = this.TokenService.GetPayload().rol_nombre;
      let run = false;
  
      switch (rol) {
        case 'Administrador':
          run = true;
          break;
        case 'Comercial':
          run = true;
          break;
        case 'Logistica':
          run = true;
          break;
      }
  
      if (!run) { this.router.navigate(['/home']); }
  
      return run;
  }
  
}
