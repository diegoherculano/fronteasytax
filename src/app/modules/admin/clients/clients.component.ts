import { Component } from '@angular/core';
import { Observable, Subscription, interval } from 'rxjs';
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
  public interval!: Subscription;

  clients: ClientType[] = [];

  constructor(private transactionsService: TransactionsService) {}

  ngOnInit(): void {}

  loadClient(
    searchValue: string = this.valueSearch,
    cancelInterval: boolean = false
  ): void {
    this.valueSearch = searchValue;

    if (cancelInterval) {
      this.isInterval = false;

      if (this.interval) {
        this.interval.unsubscribe();
      }
    }

    if (this.isInterval) {
      const SECONDS = 3 * 1000;

      this.interval = interval(SECONDS).subscribe(() => {
        this.transactionsService.getByCpf(searchValue).subscribe(
          (res) => {
            this.clients = res.data;
            this.spin = false;
          },
          () => {
            this.isInterval = false;
          }
        );
      });

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
