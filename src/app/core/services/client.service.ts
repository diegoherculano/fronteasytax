import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, map, throwError } from 'rxjs';
import { ClientType } from '../types/ClientType';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  private BASEURL: string = 'http://localhost:8080';

  constructor(private http: HttpClient, private router: Router) {}

  public create(payload: {
    cpf: string;
    password: string;
  }): Observable<CreateClientType> {
    const url = `${this.BASEURL}/client`;

    return this.http
      .post<CreateClientType>(url, payload, {
        headers: {
          Authorization: `${localStorage.getItem('access_token')}`,
        },
      })
      .pipe(
        map((res) => res),
        catchError(() => {
          return throwError(
            () => 'Não foi possível salvar. Confira os dados e tente novamente.'
          );
        })
      );
  }
}

type CreateClientType = {
  success: boolean;
  message: string;
  data: ClientType;
};
