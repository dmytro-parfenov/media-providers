import {Injectable, Injector} from '@angular/core';
import {AdapterEmitter} from '../../shared/adapter-emitter';
import {ComponentPortal} from '@angular/cdk/portal';
import {AdapterFactory} from '../../shared/adapter-factory';
import {DeezerContext} from '../../../shared/provider/deezer/deezer-context';
import {DeezerAlbumComponent} from './adapter/deezer-album/deezer-album.component';
import {DeezerEntityType} from '../../../../shared/api/deezer/deezer-entity-type.enum';

@Injectable({
  providedIn: 'root'
})
export class DeezerAdapterFactoryService extends AdapterFactory<DeezerContext> {

  constructor(private readonly injector: Injector) {
    super();
  }

  resolvePortal(context: DeezerContext, emitter: AdapterEmitter): ComponentPortal<any> {
    const provider = this.createAdapterRefProvider(context.data, emitter);

    switch (context.type) {
      case DeezerEntityType.Album:
        return this.createPortal(DeezerAlbumComponent, [provider], this.injector);
    }

    throw new Error(`Component type does not defined for ${context.type} type of Deezer adapter`);
  }
}
