import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import {SearchParams} from '../music/search-params';
import {Observable} from 'rxjs';
import {ServiceProviderType} from '../shared/service-provider-type.enum';
import {ProviderContextType} from '../music/shared/provider/provider-context-type.enum';
import {ProviderSortingType} from '../music/shared/provider/provider-sorting-type.enum';

@Injectable({
  providedIn: 'root'
})
export class SearchParamsResolverService implements Resolve<SearchParams> {

  constructor() { }

  resolve({queryParamMap}: ActivatedRouteSnapshot): Observable<SearchParams> | Promise<SearchParams> | SearchParams {
    const query = queryParamMap.get('query');
    const uniq = queryParamMap.get('uniq') === 'true';
    const providers = queryParamMap.getAll('providers') as ServiceProviderType[];
    const entity = queryParamMap.get('entity') as ProviderContextType;
    const sortBy = queryParamMap.get('sortBy') as ProviderSortingType;

    return new SearchParams(query, uniq, providers, entity, sortBy);
  }

}
