import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SearchParams} from '../search-params';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterComponent implements OnInit {

  @Input() set searchParams(searchParams: SearchParams) {
    this.createForm(searchParams);
  }

  @Output() searchParamsChange = new EventEmitter<SearchParams>();

  form: FormGroup;

  constructor(private readonly formBuilder: FormBuilder) { }

  ngOnInit() {
    if (this.form) {
      return;
    }

    this.createForm();
  }

  reset() {
    const searchParams = new SearchParams();

    this.searchParamsChange.emit(searchParams);
    this.searchParams = searchParams;
  }

  apply() {
    this.searchParamsChange.emit(new SearchParams(this.form.get('artist').value));
  }

  private createForm(searchParams?: SearchParams) {
    const artist = searchParams ? searchParams.artist : '';

    this.form = this.formBuilder.group({
      artist: [artist]
    });
  }

}
