import {ChangeDetectionStrategy, Component, Inject, Optional} from '@angular/core';
import {MAT_BOTTOM_SHEET_DATA} from '@angular/material/bottom-sheet';
import {DeezerAlbumTracksData} from './deezer-album-tracks-data';

@Component({
  selector: 'app-deezer-album-tracks',
  templateUrl: './deezer-album-tracks.component.html',
  styleUrls: ['./deezer-album-tracks.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeezerAlbumTracksComponent {

  constructor(@Optional() @Inject(MAT_BOTTOM_SHEET_DATA) readonly data: DeezerAlbumTracksData) { }

}
