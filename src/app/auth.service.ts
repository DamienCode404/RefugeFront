import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthResponse } from './auth-response';
import { AuthRequest } from './auth-request';
import { environment } from '../environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public token: string = "";
  public user!:any;
  private API_URL: string = `${ environment.API_URL }/connexion`;

  constructor(private http: HttpClient) {
    this.token = localStorage.getItem('token') as string;
    this.user = JSON.parse(localStorage.getItem('user') as string) as any;
  }

  public authenticate(authRequest: AuthRequest) {
    this.http.post<AuthResponse>(this.API_URL, {
      login: authRequest.login,
      password: authRequest.password
    }).subscribe(resp => {
      this.token = resp.token;
      this.user = resp;
      localStorage.setItem('token', this.token);
      localStorage.setItem('user', JSON.stringify(this.user));
    });
  }
}
