import {ChangeDetectionStrategy, Component, OnInit, Optional} from '@angular/core';
import {AdapterRef} from '../../../../shared/adapter-ref';
import {DeezerAlbum} from '../../../../../../shared/api/deezer/deezer-album';

@Component({
  selector: 'app-deezer-album',
  templateUrl: './deezer-album.component.html',
  styleUrls: ['./deezer-album.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeezerAlbumComponent implements OnInit {

  constructor(@Optional() private readonly adapterRef: AdapterRef<DeezerAlbum>) { }

  ngOnInit() {
  }

}
