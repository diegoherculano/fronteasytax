import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-quickview',
  templateUrl: './quickview.component.html',
})
export class QuickviewComponent {
  @Input() content!: ContentQuickview;
  @Input() spin: boolean = true;
  @Output() close = new EventEmitter<boolean>();

  onClose() {
    this.close.emit(true);
  }
}

export type ContentQuickview = {
  title: string;
  name: string;
  email: string;
  phone: string;
  cpf: string;
  address: string;
  advisor?: string;
  electoralZone?: string;
  electoralSection?: string;
  download?: {
    name: string;
    generate: () => void;
  };
} | null;
