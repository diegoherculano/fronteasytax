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
  public msgError!: string;
  isInterval = false;

  clients: ClientType[] = [];

  constructor(private transactionsService: TransactionsService) {}

  ngOnInit(): void {}

  loadClient(searchValue: string = this.valueSearch): void {
    this.valueSearch = searchValue;

    if (this.isInterval) {
      setInterval(() => {
        this.transactionsService.getByCpf(searchValue).subscribe(
          (res) => {
            this.clients = res.data;
            this.spin = false;
          },
          () => {
            this.isInterval = false;
          }
        );
      }, 5000);

      return;
    }
    this.spin = true;

    this.transactionsService.getByCpf(searchValue).subscribe(
      (res) => {
        this.clients = res.data;
        this.spin = false;
        this.isInterval = true;
        this.loadClient(searchValue);
      },
      () => {
        this.msgError = 'Cliente não encontrado';
        this.clients = [];
        this.isInterval = false;
      }
    );
  }

  pageChanged(event: number): void {
    this.currentPage = event;
  }

  onModalCloseClick(close: boolean) {
    if (close) {
      this.spin = false;
      this.msgError = '';
    }
  }
}
