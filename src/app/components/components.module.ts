import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonPrimaryComponent } from './common/button-primary/button-primary.component';
import { InputSpinComponent } from './common/input-spin/input-spin.component';
import { ModalComponent } from './common/modal/modal.component';
import { InputSearchComponent } from './common/input-search/input-search.component';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PaginationComponent } from './common/pagination/pagination.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { QuickviewComponent } from './common/quickview/quickview.component';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { SimpleCardComponent } from './common/simple-card/simple-card.component';
import { ButtonSecundaryComponent } from './common/button-secundary/button-secundary.component';

@NgModule({
  declarations: [
    ButtonPrimaryComponent,
    InputSpinComponent,
    ModalComponent,
    InputSearchComponent,
    PaginationComponent,
    QuickviewComponent,
    SimpleCardComponent,
    ButtonSecundaryComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    FontAwesomeModule,
    NgxPaginationModule,
    NgxMaskDirective,
    NgxMaskPipe,
  ],
  exports: [
    ButtonPrimaryComponent,
    InputSpinComponent,
    ModalComponent,
    InputSearchComponent,
    PaginationComponent,
    QuickviewComponent,
    SimpleCardComponent,
    ButtonSecundaryComponent,
  ],
  providers: [provideNgxMask()],
})
export class ComponentsModule {}
