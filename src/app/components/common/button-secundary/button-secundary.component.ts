import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button-secundary',
  templateUrl: './button-secundary.component.html',
})
export class ButtonSecundaryComponent {
  @Input() isDisabled: boolean = false;
  @Input() type: String = '';
}
