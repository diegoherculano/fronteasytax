import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, catchError, map, throwError } from 'rxjs';
import { UserTokenDecodedType } from '../types/UserTokenDecodedType';
import { AuthType } from '../types/AuthType';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private BASEURL: string = 'http://localhost:3000';
  private jwtHelper: JwtHelperService = new JwtHelperService();

  constructor(private http: HttpClient, private router: Router) {}

  public signIn(payload: { login: string; password: string }): Observable<any> {
    const endpoint = '/admin';

    return this.http.get<AuthType>(`${this.BASEURL}${endpoint}`).pipe(
      map((res) => {
        const token = res.data.access_token;
        localStorage.removeItem('access_token');
        localStorage.setItem('access_token', token);
        const { roles } = this.jwtHelper.decodeToken(
          token
        ) as UserTokenDecodedType;

        const route = roles.includes('ADMIN') ? 'admin' : 'client';

        return this.router.navigate([route]);
      }),
      catchError(() => {
        return throwError(
          () => 'Email e/ou senha inválido(s). Tente novamente.'
        );
      })
    );
    return this.http
      .post<{ token: string }>(`${this.BASEURL}${endpoint}`, payload)
      .pipe(
        map((res) => {
          localStorage.removeItem('access_token');
          localStorage.setItem('access_token', res.token);
          const { roles } = this.jwtHelper.decodeToken(
            res.token
          ) as UserTokenDecodedType;
          return this.router.navigate([roles]);
        }),
        catchError(() => {
          return throwError(
            () => 'Email e/ou senha inválido(s). Tente novamente.'
          );
        })
      );
  }

  public isAdmin(): boolean {
    const token = localStorage.getItem('access_token');

    if (!token) return false;

    if (this.jwtHelper.isTokenExpired(token)) return false;

    if (this.jwtHelper.decodeToken(token)?.roles.includes('ADMIN')) return true;

    return false;
  }

  public isClient(): boolean {
    const token = localStorage.getItem('access_token');

    if (!token) return false;

    if (this.jwtHelper.isTokenExpired(token)) return false;

    if (this.jwtHelper.decodeToken(token)?.roles.includes('CLIENTE'))
      return true;

    return false;
  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('access_token');

    if (!token) return false;

    return !this.jwtHelper.isTokenExpired(token);
  }

  public logout() {
    localStorage.removeItem('access_token');
    return this.router.navigate(['login']);
  }
}
