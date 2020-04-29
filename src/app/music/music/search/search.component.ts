import {ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Inject, Input, OnInit, Optional, Output} from '@angular/core';
import {SearchParams} from '../search-params';
import {FormBuilder, FormGroup} from '@angular/forms';
import {SERVICE_PROVIDERS} from '../service-providers.key';
import {Provider} from '../shared/provider/provider';
import {ProviderContextType} from '../shared/provider/provider-context-type.enum';
import {uniq} from 'lodash-es';
import {ProviderSortingType} from '../shared/provider/provider-sorting-type.enum';
import {ProviderQueryType} from '../shared/provider/provider-query-type.enum';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchComponent implements OnInit {

  @Input() set searchParams(searchParams: SearchParams) {
    this.reloadForm(searchParams);
  }

  @Input() set loading(loading: boolean) {
    if (!this.form) {
      return;
    }

    if (loading) {
      this.form.disable();
      return;
    }

    this.form.enable();
  }

  @Output() searchParamsChange = new EventEmitter<SearchParams>();

  resultsCount = '';

  form: FormGroup;

  entities: ProviderContextType[] = [];

  queryTypes: ProviderQueryType[] = [];

  sortingTypes: ProviderSortingType[] = [
    ProviderSortingType.NameAsc,
    ProviderSortingType.NameDesc,
    ProviderSortingType.ProviderAsc,
    ProviderSortingType.ProviderDesc
  ];

  get serviceProviders() {
    return this.providers || [];
  }

  constructor(private readonly formBuilder: FormBuilder,
              private readonly changeDetectorRef: ChangeDetectorRef,
              @Optional() @Inject(SERVICE_PROVIDERS) private readonly providers: Provider[]) { }

  ngOnInit() {
    this.updateEntities();
    this.updateQueryTypes();

    if (this.form) {
      return;
    }

    this.reloadForm();
  }

  updateResultsCount(count: string) {
    this.resultsCount = count;
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
      this.form.get('providers').value,
      this.form.get('entity').value,
      this.form.get('queryType').value,
      this.form.get('sortBy').value
    );

    this.searchParamsChange.emit(searchParams);
  }

  private reloadForm(searchParams?: SearchParams) {
    if (!searchParams) {
      searchParams = new SearchParams();
    }

    if (this.form) {
      this.form.get('query').setValue(searchParams.query);
      this.form.get('uniq').setValue(searchParams.uniq);
      this.form.get('providers').setValue(searchParams.providers);
      this.form.get('entity').setValue(searchParams.entity);
      this.form.get('queryType').setValue(searchParams.queryType);
      this.form.get('sortBy').setValue(searchParams.sortBy);
    } else {
      this.form = this.formBuilder.group({
        query: [searchParams.query],
        uniq: [searchParams.uniq],
        providers: [searchParams.providers],
        entity: [searchParams.entity],
        queryType: [searchParams.queryType],
        sortBy: [searchParams.sortBy]
      });
    }
  }

  private updateQueryTypes() {
    const queryTypes = this.serviceProviders.reduce<ProviderQueryType[]>((previousValue, currentValue) =>
      previousValue.concat(currentValue.queryTypes), []
    );

    this.queryTypes = uniq(queryTypes);
  }

  private updateEntities() {
    const entities = this.serviceProviders.reduce<ProviderContextType[]>((previousValue, currentValue) =>
      previousValue.concat(currentValue.entities), []
    );

    this.entities = uniq(entities);
  }

}
