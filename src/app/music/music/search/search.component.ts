import {ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Inject, Input, OnInit, Optional, Output} from '@angular/core';
import {SearchParams} from '../search-params';
import {FormBuilder, FormGroup} from '@angular/forms';
import {SERVICE_PROVIDER} from '../service-provider';
import {Provider} from '../shared/provider/provider';
import {ServiceProvider} from '../../shared/service-provider.enum';
import {isNotNullOrUndefined} from 'codelyzer/util/isNotNullOrUndefined';

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

  private availableProviders: ServiceProvider[] = [];

  constructor(private readonly formBuilder: FormBuilder,
              private readonly changeDetectorRef: ChangeDetectorRef,
              @Optional() @Inject(SERVICE_PROVIDER) private readonly providers: Provider[]) { }

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
    const searchParams = new SearchParams(
      this.form.get('query').value,
      this.form.get('uniq').value,
      this.form.get('providers').value
    );

    this.searchParamsChange.emit(searchParams);
  }

  private createForm(searchParams?: SearchParams) {
    const query = searchParams ? searchParams.query : '';
    const uniq = (searchParams && isNotNullOrUndefined(searchParams.uniq)) ? searchParams.uniq : true;
    const providers = (searchParams && searchParams.providers.length) ? searchParams.providers : this.getAvailableProviders();

    this.form = this.formBuilder.group({
      query: [query],
      uniq: [uniq],
      providers: [providers]
    });
  }

  private getAvailableProviders() {
    if (!this.providers) {
      return [];
    }

    if (this.availableProviders.length) {
      return  this.availableProviders;
    }

    this.availableProviders = this.providers.map(provider => provider.type);

    return this.availableProviders;
  }

}
