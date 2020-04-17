import {Injectable, Type} from '@angular/core';
import {ServiceProvider} from '../../shared/service-provider.enum';
import {DeezerComponent} from './deezer/deezer.component';
import {ItunesComponent} from './itunes/itunes.component';

@Injectable({
  providedIn: 'root'
})
export class MediaFactoryService {

  constructor() { }

  resolveComponentType(serviceProvider: ServiceProvider): Type<any> {
    switch (serviceProvider) {
      case ServiceProvider.Deezer:
        return DeezerComponent;
      case ServiceProvider.iTunes:
        return ItunesComponent;
    }

    throw new Error(`Component type does not defined for ${serviceProvider} service provider`);
  }
}
