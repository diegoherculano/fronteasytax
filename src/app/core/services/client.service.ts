import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ClientType } from '../types/ClientType';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  private BASEURL: string = 'http://localhost:3000';

  constructor(private http: HttpClient, private router: Router) {}

  public getByCpf(cpf: number): Observable<ClientType> {
    const url = `${this.BASEURL}/client/?cpf=${cpf}`;
    return this.http.get<ClientType>(url, {
      headers: {
        Authorization: `${localStorage.getItem('access_token')}`,
      },
    });
  }
}
