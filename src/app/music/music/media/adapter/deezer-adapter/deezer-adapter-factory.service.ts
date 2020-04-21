import {Injectable, Injector} from '@angular/core';
import {AdapterEmitter} from '../../shared/adapter-emitter';
import {ComponentPortal} from '@angular/cdk/portal';
import {ProviderContextType} from '../../../shared/provider/provider-context-type.enum';
import {AdapterFactory} from '../../shared/adapter-factory';
import {DeezerContext} from '../../../shared/provider/deezer/deezer-context';
import {DeezerAlbumComponent} from './adapter/deezer-album/deezer-album.component';

@Injectable({
  providedIn: 'root'
})
export class DeezerAdapterFactoryService extends AdapterFactory {

  constructor(private readonly injector: Injector) {
    super();
  }

  resolvePortal(context: DeezerContext, emitter: AdapterEmitter): ComponentPortal<any> {
    const provider = this.createAdapterRefProvider(context.data, emitter);

    switch (context.type) {
      case ProviderContextType.Album:
        return this.createPortal(DeezerAlbumComponent, [provider], this.injector);
    }

    throw new Error(`Component type does not defined for ${context.type} type of Deezer adapter`);
  }
}
