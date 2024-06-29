import { Component } from '@angular/core';
import { TransactionsService } from 'src/app/core/services/transactions.service';
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

  constructor(private transactionsService: TransactionsService) {}

  ngOnInit(): void {}

  loadClient(searchValue: string = this.valueSearch): void {
    this.valueSearch = searchValue;

    this.transactionsService.getByCpf(searchValue).subscribe((res) => {
      this.clients = res.data;
    });
  }

  pageChanged(event: number): void {
    this.currentPage = event;
  }
}
