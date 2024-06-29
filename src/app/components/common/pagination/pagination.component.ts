import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
})
export class PaginationComponent {
  @Input() currentPage!: number;
  @Input() pageSize!: number;
  @Input() totalItems!: number;
  @Input() title!: string;

  @Output() pageChanged = new EventEmitter<number>();

  public onPageChange(page: number): void {
    this.pageChanged.emit(page);
  }
}
