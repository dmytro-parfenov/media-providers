import {ChangeDetectionStrategy, Component, Input, OnDestroy, Optional} from '@angular/core';
import {SearchComponent} from '../search.component';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchResultsComponent implements OnDestroy {

  @Input() set length(length: number) {
    if (!this.filterComponent) {
      return;
    }

    const count = length ? length.toString(10) : '';

    this.filterComponent.updateResultsCount(count);
  }

  constructor(@Optional() private readonly filterComponent: SearchComponent) { }

  ngOnDestroy() {
    if (!this.filterComponent) {
      return;
    }

    this.filterComponent.updateResultsCount('');
  }

}
