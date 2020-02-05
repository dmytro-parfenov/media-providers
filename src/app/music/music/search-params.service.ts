import {Injectable} from '@angular/core';
import {Params, Router} from '@angular/router';
import {SearchParams} from './search-params';

@Injectable({
  providedIn: 'root'
})
export class SearchParamsService {

  constructor(private readonly router: Router) { }

  update(params: SearchParams) {
    const queryParams: Params = {};

    Object.keys(params).forEach(key => {
      const value = params[key];

      if (!this.isValidParamValue(value)) {
        return;
      }

      queryParams[key] = value;
    });

    this.router.navigate([], {queryParams});
  }

  private isValidParamValue(value: any) {
    return value !== null && value !== undefined && value !== '';
  }
}
