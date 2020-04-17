import {Injectable, Injector, StaticProvider, ValueProvider} from '@angular/core';
import {ServiceProvider} from '../../shared/service-provider.enum';
import {DeezerComponent} from './deezer/deezer.component';
import {ItunesComponent} from './itunes/itunes.component';
import {ComponentPortal, ComponentType} from '@angular/cdk/portal';
import {Media} from '../shared/media/media';
import {ITUNES_CONTEXT} from './itunes/itunes-context-key';
import {DEEZER_CONTEXT} from './deezer/deezer-context-key';

@Injectable({
  providedIn: 'root'
})
export class MediaFactoryService {

  constructor(private readonly injector: Injector) { }

  createComponentPortal(media: Media): ComponentPortal<any> {
    switch (media.type) {
      case ServiceProvider.Deezer:
        return this.createPortal(DeezerComponent, {provide: DEEZER_CONTEXT, useValue: media.context});
      case ServiceProvider.iTunes:
        return this.createPortal(ItunesComponent, {provide: ITUNES_CONTEXT, useValue: media.context});
    }

    throw new Error(`Component type does not defined for ${media.type} service provider`);
  }

  private createPortal<C>(componentType: ComponentType<C>, provider: ValueProvider) {
    const injector = this.createInjector([provider]);

    return new ComponentPortal<C>(componentType, null, injector);
  }

  private createInjector(providers: StaticProvider[]) {
    return Injector.create({ parent: this.injector, providers });
  }
}
