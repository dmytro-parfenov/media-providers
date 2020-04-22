import {ServiceProvider} from '../shared/service-provider.enum';

export class SearchParams {
  constructor(public query = '', public uniq: boolean = null, public providers: ServiceProvider[] = []) {
  }
}
