import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientRoutingModule } from './client-routing.module';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxMaskPipe } from 'ngx-mask';

@NgModule({
  declarations: [HomeComponent, NavbarComponent, TransactionsComponent],
  imports: [
    CommonModule,
    ComponentsModule,
    ClientRoutingModule,
    NgxPaginationModule,
    NgxMaskPipe,
  ],
})
export class ClientModule {}
