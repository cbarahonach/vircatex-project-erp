import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(private cookieService: CookieService) { }

  GetTokenAvaible() {
    return !!this.cookieService.get('jwt-token');
  }

  GetToken() {
    return this.cookieService.get('jwt-token');
  }

  SetToken(token) {
    this.cookieService.set('jwt-token', token, 0.5);
  }

  DeleteToken() {
    this.cookieService.deleteAll();
  }

  GetPayload() {
    const token = this.GetToken();
    let data;
    if (token) {
      data = token.split('.')[1];
      data = JSON.parse(this.DecryptBase64UTF8(data));
    }
    
    return data.payload;
  }

  DecryptBase64UTF8(str) {
    return decodeURIComponent(escape(window.atob(str)));
  }
}
