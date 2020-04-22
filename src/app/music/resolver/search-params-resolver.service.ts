import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import {SearchParams} from '../music/search-params';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchParamsResolverService implements Resolve<SearchParams> {

  constructor() { }

  resolve({queryParamMap}: ActivatedRouteSnapshot): Observable<SearchParams> | Promise<SearchParams> | SearchParams {
    const query = queryParamMap.get('query');
    const uniq = queryParamMap.get('uniq') !== 'false';

    return new SearchParams(query, uniq);
  }

}
