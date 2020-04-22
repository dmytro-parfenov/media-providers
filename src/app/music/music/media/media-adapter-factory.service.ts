import {Injectable, Injector} from '@angular/core';
import {AdapterFactory} from './shared/adapter-factory';
import {Media} from '../shared/media/media';
import {AdapterEmitter} from './shared/adapter-emitter';
import {ComponentPortal} from '@angular/cdk/portal';
import {ServiceProviderType} from '../../shared/service-provider-type.enum';
import {DeezerAdapterComponent} from './adapter/deezer-adapter/deezer-adapter.component';
import {ItunesAdapterComponent} from './adapter/itunes-adapter/itunes-adapter.component';

@Injectable({
  providedIn: 'root'
})
export class MediaAdapterFactoryService extends AdapterFactory {

  constructor(private readonly injector: Injector) {
    super();
  }

  resolvePortal(media: Media, emitter: AdapterEmitter): ComponentPortal<any> {
    const provider = this.createAdapterRefProvider(media.context, emitter);

    switch (media.type) {
      case ServiceProviderType.Deezer:
        return this.createPortal(DeezerAdapterComponent, [provider], this.injector);
      case ServiceProviderType.iTunes:
        return this.createPortal(ItunesAdapterComponent, [provider], this.injector);
    }

    throw new Error(`Component type does not defined for ${media.type} service provider`);
  }

}
