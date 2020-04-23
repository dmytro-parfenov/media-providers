import {MediaContextManager} from '../media-context-manager';
import {ItunesContext} from '../../shared/provider/itunes/itunes-context';
import {ItunesTrack} from '../../../shared/api/itunes/itunes-track';

export class ItunesTrackManager implements MediaContextManager<ItunesContext<ItunesTrack>> {

  getName(context: ItunesContext<ItunesTrack>) {
    return context.data.trackName;
  }
}
