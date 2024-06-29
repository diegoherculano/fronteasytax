import { Component } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { TransactionsService } from 'src/app/core/services/transactions.service';
import { ClientType } from 'src/app/core/types/ClientType';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css'],
})
export class TransactionsComponent {
  valueSearch = '';
  currentPage: number = 1;
  pageSize: number = 5;
  totalItems: number = 0;
  spin: boolean = false;
  public msgError!: string;
  private jwtHelper: JwtHelperService = new JwtHelperService();

  clients: ClientType[] = [];

  constructor(private transactionsService: TransactionsService) {}

  ngOnInit(): void {
    const { sub } = this.jwtHelper.decodeToken(
      localStorage.getItem('access_token') || ''
    );

    if (sub) {
      this.loadClient(sub);
    }
  }

  loadClient(searchValue: string = this.valueSearch): void {
    this.valueSearch = searchValue;
    this.spin = true;

    this.transactionsService.getByCpf(searchValue).subscribe(
      (res) => {
        this.clients = res.data;
        this.spin = false;
      },
      () => {
        this.msgError = 'Cliente não encontrado.';
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
