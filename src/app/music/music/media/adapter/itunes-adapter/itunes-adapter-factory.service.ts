import {Injectable, Injector} from '@angular/core';
import {AdapterFactory} from '../../shared/adapter-factory';
import {AdapterEmitter} from '../../shared/adapter-emitter';
import {ComponentPortal} from '@angular/cdk/portal';
import {ItunesContext} from '../../../shared/provider/itunes/itunes-context';
import {ItunesAlbumComponent} from './adapter/itunes-album/itunes-album.component';
import {ItunesMusicEntityType} from '../../../../shared/api/itunes/itunes-music-entity-type.enum';

@Injectable({
  providedIn: 'root'
})
export class ItunesAdapterFactoryService extends AdapterFactory<ItunesContext> {

  constructor(private readonly injector: Injector) {
    super();
  }

  resolvePortal(context: ItunesContext, emitter: AdapterEmitter): ComponentPortal<any> {
    const provider = this.createAdapterRefProvider(context.data, emitter);

    switch (context.type) {
      case ItunesMusicEntityType.Album:
        return this.createPortal(ItunesAlbumComponent, [provider], this.injector);
    }

    throw new Error(`Component type does not defined for ${context.type} type of Itunes adapter`);
  }
}
