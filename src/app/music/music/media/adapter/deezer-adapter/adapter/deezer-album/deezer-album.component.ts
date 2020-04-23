import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Optional} from '@angular/core';
import {AdapterRef} from '../../../../shared/adapter-ref';
import {DeezerAlbum} from '../../../../../../shared/api/deezer/deezer-album';
import {DeezerDataService} from '../../../../../../shared/api/deezer-data.service';
import {catchError, finalize, map, tap} from 'rxjs/operators';
import {DeezerResult} from '../../../../../../shared/api/deezer/deezer-result';
import {DeezerTrack} from '../../../../../../shared/api/deezer/deezer-track';
import {of} from 'rxjs';
import {MatBottomSheet} from '@angular/material/bottom-sheet';
import {DeezerAlbumTracksComponent} from './deezer-album-tracks/deezer-album-tracks.component';
import {DeezerAlbumTracksData} from './deezer-album-tracks/deezer-album-tracks-data';

@Component({
  selector: 'app-deezer-album',
  templateUrl: './deezer-album.component.html',
  styleUrls: ['./deezer-album.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeezerAlbumComponent {

  album: DeezerAlbum;

  areTracksLoading = false;

  constructor(private readonly deezerDataService: DeezerDataService,
              private readonly changeDetectorRef: ChangeDetectorRef,
              private readonly bottomSheet: MatBottomSheet,
              @Optional() private readonly adapterRef: AdapterRef<DeezerAlbum>) {
    if (!adapterRef) {
      return;
    }

    this.album = adapterRef.context;
  }

  showTracks() {
    this.areTracksLoading = true;

    this.deezerDataService.getAlbumTracks(this.album.id).pipe(
      map<DeezerResult<DeezerTrack>, DeezerTrack[]>(response => response.data),
      tap(tracks => {
        this.bottomSheet.open<DeezerAlbumTracksComponent, DeezerAlbumTracksData>(DeezerAlbumTracksComponent,
          {data: {
              cover: this.album.cover_medium,
              title: this.album.title,
              artist: this.album.artist.name,
              tracks}});
      }),
      catchError(() => {
        console.error(`Unable to get track list for the ${this.album.title} album`);
        return of(null);
      }),
      finalize(() => {
        this.areTracksLoading = false;
        this.changeDetectorRef.markForCheck();
      })
    ).subscribe();
  }

}
