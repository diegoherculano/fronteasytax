import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-simple-card',
  templateUrl: './simple-card.component.html',
})
export class SimpleCardComponent {
  @Input() title?: string | number;
  @Input() content?: string | number | number;
  @Input() spin: boolean = true;
  @Input() moreInfo?: MoreInfo;
}

type MoreInfo = {
  firstInfo: {
    title: string | number;
    content: string | number;
  };
  secondInfo: {
    title: string | number;
    content: string | number;
  };
};
