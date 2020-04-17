import {Injectable, Injector, StaticProvider, ValueProvider} from '@angular/core';
import {ServiceProvider} from '../../shared/service-provider.enum';
import {DeezerAdapterComponent} from './adapter/deezer-adapter/deezer-adapter.component';
import {ItunesAdapterComponent} from './adapter/itunes-adapter/itunes-adapter.component';
import {ComponentPortal, ComponentType} from '@angular/cdk/portal';
import {Media} from '../shared/media/media';
import {MediaAdapterRef} from './adapter/media-adapter-ref';
import {MediaAdapterEmitter} from './adapter/media-adapter-emitter';

@Injectable({
  providedIn: 'root'
})
export class MediaAdapterFactoryService {

  constructor(private readonly injector: Injector) { }

  resolvePortal(media: Media, emitter: MediaAdapterEmitter): ComponentPortal<any> {
    const provider = this.createAdapterRefProvider(media, emitter);

    switch (media.type) {
      case ServiceProvider.Deezer:
        return this.createPortal(DeezerAdapterComponent, provider);
      case ServiceProvider.iTunes:
        return this.createPortal(ItunesAdapterComponent, provider);
    }

    throw new Error(`Component type does not defined for ${media.type} service provider`);
  }

  private createAdapterRefProvider<C = any, D = any>(media: Media, emitter: MediaAdapterEmitter<D>): ValueProvider {
    const adapterRef = new MediaAdapterRef<C, D>(media.context, emitter);

    return {provide: MediaAdapterRef, useValue: adapterRef};
  }

  private createPortal<C>(componentType: ComponentType<C>, provider: StaticProvider) {
    const injector = this.createInjector([provider]);

    return new ComponentPortal<C>(componentType, null, injector);
  }

  private createInjector(providers: StaticProvider[]) {
    return Injector.create({ parent: this.injector, providers });
  }
}
