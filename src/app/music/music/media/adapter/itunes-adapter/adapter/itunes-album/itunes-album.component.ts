import {ChangeDetectionStrategy, Component, OnInit, Optional} from '@angular/core';
import {AdapterRef} from '../../../../shared/adapter-ref';
import {ItunesAlbum} from '../../../../../../shared/api/itunes/itunes-album';

@Component({
  selector: 'app-itunes-album',
  templateUrl: './itunes-album.component.html',
  styleUrls: ['./itunes-album.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItunesAlbumComponent implements OnInit {

  constructor(@Optional() private readonly adapterRef: AdapterRef<ItunesAlbum>) { }

  ngOnInit() {
  }

}
