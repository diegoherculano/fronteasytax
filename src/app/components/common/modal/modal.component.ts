import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
})
export class ModalComponent {
  @Input() content!: string;
  @Input() isSuccessModal: boolean = false;
  @Output() close = new EventEmitter<boolean>();

  onClose() {
    this.close.emit(true);
  }
}
