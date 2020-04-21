import {ChangeDetectionStrategy, Component, Optional} from '@angular/core';
import {AdapterRef} from '../../../../shared/adapter-ref';
import {ItunesAlbum} from '../../../../../../shared/api/itunes/itunes-album';
import {DateTime} from 'luxon';

@Component({
  selector: 'app-itunes-album',
  templateUrl: './itunes-album.component.html',
  styleUrls: ['./itunes-album.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItunesAlbumComponent {

  album: ItunesAlbum;

  releaseDate = '';

  constructor(@Optional() private readonly adapterRef: AdapterRef<ItunesAlbum>) {
    if (!adapterRef) {
      return;
    }

    this.album = adapterRef.context;
    this.releaseDate = DateTime.fromISO(this.album.releaseDate).toFormat('yyyy LLL dd');
  }

}
