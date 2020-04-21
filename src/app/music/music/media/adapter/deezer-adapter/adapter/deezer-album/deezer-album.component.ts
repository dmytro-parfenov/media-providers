import {ChangeDetectionStrategy, Component, Optional} from '@angular/core';
import {AdapterRef} from '../../../../shared/adapter-ref';
import {DeezerAlbum} from '../../../../../../shared/api/deezer/deezer-album';

@Component({
  selector: 'app-deezer-album',
  templateUrl: './deezer-album.component.html',
  styleUrls: ['./deezer-album.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeezerAlbumComponent {

  album: DeezerAlbum;

  constructor(@Optional() private readonly adapterRef: AdapterRef<DeezerAlbum>) {
    if (!adapterRef) {
      return;
    }

    this.album = adapterRef.context;
  }

}
