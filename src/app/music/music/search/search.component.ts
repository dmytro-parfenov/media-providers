import {ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SearchParams} from '../search-params';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchComponent implements OnInit {

  @Input() set searchParams(searchParams: SearchParams) {
    this.createForm(searchParams);
  }

  @Output() searchParamsChange = new EventEmitter<SearchParams>();

  form: FormGroup;

  results: string | null = null;

  constructor(private readonly formBuilder: FormBuilder,
              private readonly changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit() {
    if (this.form) {
      return;
    }

    this.createForm();
  }

  setResults(results: number) {
    this.results = results ? results.toString(10) : null;
    this.changeDetectorRef.markForCheck();
  }

  reset() {
    const searchParams = new SearchParams();

    this.searchParamsChange.emit(searchParams);
    this.searchParams = searchParams;
  }

  apply() {
    this.searchParamsChange.emit(new SearchParams(this.form.get('query').value));
  }

  private createForm(searchParams?: SearchParams) {
    const query = searchParams ? searchParams.query : '';

    this.form = this.formBuilder.group({
      query: [query]
    });
  }

}
