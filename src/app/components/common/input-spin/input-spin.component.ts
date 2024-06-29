import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-input-spin',
  templateUrl: './input-spin.component.html',
})
export class InputSpinComponent {
  @Input() textBlack: boolean = false;
}
