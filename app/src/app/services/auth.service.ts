import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { appURL } from '../app.uri';
import { TokenService } from './token.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(this.TokenService.GetTokenAvaible());

  constructor(private http: HttpClient, private router: Router, private TokenService: TokenService) { }

  isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  Signin(data): Observable<any> {
    return this.http.post(`${appURL}/auth/signin`, data);
  }

  Login(data): Observable<any> {
    return this.http.post(`${appURL}/auth/login`, data);
  }

  LoginIsValid() {
    this.loggedIn.next(true);
    this.router.navigate(['/home']);
  }

  Logout() {
    this.loggedIn.next(false);
    this.TokenService.DeleteToken();
    this.router.navigate(['/login']);
  }

  ChangePassword(data): Observable<any> {
    return this.http.post(`${appURL}/auth/change-password`, data);
  }

  // Solo para pruebas - el servicio TokenService::GetPayLoad contiene los mismos datos.
  Me(): Observable<any> {
    return this.http.get(`${appURL}/auth/me`);
  }
}
