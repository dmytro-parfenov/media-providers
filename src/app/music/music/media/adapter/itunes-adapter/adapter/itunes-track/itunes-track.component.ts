import {ChangeDetectionStrategy, Component, Optional} from '@angular/core';
import {AdapterRef} from '../../../../shared/adapter-ref';
import {ItunesTrack} from '../../../../../../shared/api/itunes/itunes-track';
import {DateTime} from 'luxon';

@Component({
  selector: 'app-itunes-track',
  templateUrl: './itunes-track.component.html',
  styleUrls: ['./itunes-track.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItunesTrackComponent {

  track: ItunesTrack;

  releaseDate = '';

  constructor(@Optional() private readonly adapterRef: AdapterRef<ItunesTrack>) {
    if (!adapterRef) {
      return;
    }

    this.track = adapterRef.context;
    this.releaseDate = DateTime.fromISO(this.track.releaseDate).toFormat('yyyy LLL dd');
  }

}
