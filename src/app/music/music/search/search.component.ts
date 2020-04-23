import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  Optional,
  Output
} from '@angular/core';
import {SearchParams} from '../search-params';
import {FormBuilder, FormGroup} from '@angular/forms';
import {SERVICE_PROVIDER} from '../service-provider';
import {Provider} from '../shared/provider/provider';
import {Subject} from 'rxjs';
import {ProviderContextType} from '../shared/provider/provider-context-type.enum';
import {uniq} from 'lodash-es';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchComponent implements OnInit, OnDestroy {

  @Input() set searchParams(searchParams: SearchParams) {
    this.reloadForm(searchParams);
  }

  @Output() searchParamsChange = new EventEmitter<SearchParams>();

  resultsCount = '';

  form: FormGroup;

  entities: ProviderContextType[] = [];

  get serviceProviders() {
    return this.providers || [];
  }

  private formReload$ = new Subject();

  private destroy$ = new Subject();

  constructor(private readonly formBuilder: FormBuilder,
              private readonly changeDetectorRef: ChangeDetectorRef,
              @Optional() @Inject(SERVICE_PROVIDER) private readonly providers: Provider[]) { }

  ngOnInit() {
    this.updateEntities();

    if (this.form) {
      return;
    }

    this.reloadForm();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
    this.formReload$.complete();
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
      this.form.get('entity').value
    );

    this.searchParamsChange.emit(searchParams);
  }

  private reloadForm(searchParams?: SearchParams) {
    this.formReload$.next();

    if (!searchParams) {
      searchParams = new SearchParams();
    }

    if (this.form) {
      this.form.get('query').setValue(searchParams.query);
      this.form.get('uniq').setValue(searchParams.uniq);
      this.form.get('providers').setValue(searchParams.providers);
      this.form.get('entity').setValue(searchParams.entity);
      return;
    }

    this.form = this.formBuilder.group({
      query: [searchParams.query],
      uniq: [searchParams.uniq],
      providers: [searchParams.providers],
      entity: [searchParams.entity]
    });
  }

  private updateEntities() {
    const entities = this.serviceProviders.reduce<ProviderContextType[]>((previousValue, currentValue) =>
      previousValue.concat(currentValue.entities), []
    );

    this.entities = uniq(entities);
  }

}
