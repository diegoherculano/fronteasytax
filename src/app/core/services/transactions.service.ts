import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TransactionsType } from '../types/TransactionsType';

@Injectable({
  providedIn: 'root',
})
export class TransactionsService {
  private BASEURL: string = 'http://localhost:8080';

  constructor(private http: HttpClient, private router: Router) {}

  public getByCpf(cpf: string): Observable<TransactionsType> {
    const url = `${this.BASEURL}/transactions?cpf=${cpf}`;
    return this.http.get<TransactionsType>(url, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },
    });
  }
}
