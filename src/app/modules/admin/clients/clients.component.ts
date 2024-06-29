import { Component } from '@angular/core';
import { ClientType } from 'src/app/core/types/ClientType';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css'],
})
export class ClientsComponent {
  valueSearch = '';
  currentPage: number = 1;
  pageSize: number = 5;
  totalItems: number = 0;
  spin: boolean = false;

  clients: ClientType[] = [];

  constructor() {}

  ngOnInit(): void {
    this.clients = [
      {
        _id: '6680136d894fa4001f05ac76',
        name: 'João da Silva Teste',
        cpf: '012345678901',
        valor: 10,
        app_name: 'EasyTax',
        __v: 0,
      },
    ];
  }

  pageChanged(event: number): void {
    this.currentPage = event;
  }
}
