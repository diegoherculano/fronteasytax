import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-input-search',
  templateUrl: './input-search.component.html',
})
export class InputSearchComponent {
  @Input() spin = false;
  @Input() valueSearch = '';
  @Output() search = new EventEmitter<string>();
  faSearch = faSearch;

  public onSearch() {
    this.search.emit(this.valueSearch);
  }
}
