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
import {ServiceProviderType} from '../../shared/service-provider-type.enum';
import {isNotNullOrUndefined} from 'codelyzer/util/isNotNullOrUndefined';
import {Subject} from 'rxjs';
import {takeUntil, tap} from 'rxjs/operators';
import {ProviderContextType} from '../shared/provider/provider-context-type.enum';
import {first, uniq} from 'lodash-es';

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

  form: FormGroup;

  results: string | null = null;

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

  updateResults(results: number) {
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
      this.form.get('providers').value,
      this.form.get('entity').value
    );

    this.searchParamsChange.emit(searchParams);
  }

  private reloadForm(searchParams?: SearchParams) {
    this.formReload$.next();

    const query = searchParams ? searchParams.query : '';

    const unique = (searchParams && isNotNullOrUndefined(searchParams.uniq)) ? searchParams.uniq : true;

    const providers = (searchParams && searchParams.providers.length) ?
      searchParams.providers :
      this.serviceProviders.map(provider => provider.type);

    this.updateEntities(providers);
    const entity = (searchParams && searchParams.entity && this.isEntityAvailable(searchParams.entity)) ?
      searchParams.entity :
      first(this.entities);

    if (this.form) {
      this.form.get('query').setValue(query);
      this.form.get('uniq').setValue(uniq);
      this.form.get('providers').setValue(providers);
      this.form.get('entity').setValue(entity);
    } else {
      this.form = this.formBuilder.group({
        query: [query],
        uniq: [unique],
        providers: [providers],
        entity: [entity]
      });
    }

    this.updateFormUniqStatus(providers);

    this.initiateFormListeners();
  }

  private initiateFormListeners() {
    this.form.get('providers').valueChanges.pipe(
      tap((providers: ServiceProviderType[]) => {
        this.updateEntities(providers);

        if (!this.isEntityAvailable(this.form.get('entity').value)) {
          this.form.get('entity').setValue(first(this.entities));
        }

        this.updateFormUniqStatus(providers);
      }),
      takeUntil(this.formReload$),
      takeUntil(this.destroy$)
    ).subscribe();
  }

  private updateFormUniqStatus(basedOnpProviders: ServiceProviderType[]) {
    if (!this.form) {
      return;
    }

    if (this.isUniqAvailableForProviderTypes(basedOnpProviders)) {
      this.form.get('uniq').enable();
      return;
    }

    this.form.get('uniq').disable();
  }

  private updateEntities(fromProviderTypes: ServiceProviderType[] = []) {
    const entities = this.serviceProviders.reduce<ProviderContextType[]>((previousValue, currentValue) => {
        const currentEntities = currentValue.entities;

        if (!fromProviderTypes.length) {
          return previousValue.concat(currentEntities);
        }

        return previousValue.concat(fromProviderTypes.includes(currentValue.type) ? currentEntities : []);
      },
      []
    );

    this.entities = uniq(entities);
  }

  private isEntityAvailable(entity: ProviderContextType) {
    return this.entities.includes(entity);
  }

  private isUniqAvailableForProviderTypes(providerTypes: ServiceProviderType[]) {
    return providerTypes.length !== 1;
  }

}
