import {ChangeDetectionStrategy, Component, OnInit, Optional} from '@angular/core';
import {MediaAdapterRef} from '../media-adapter-ref';
import {ItunesContext} from '../../../shared/provider/itunes/itunes-context';

@Component({
  selector: 'app-itunes',
  templateUrl: './itunes.component.html',
  styleUrls: ['./itunes.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItunesComponent implements OnInit {

  constructor(@Optional() private readonly mediaAdapterRef: MediaAdapterRef<ItunesContext>) { }

  ngOnInit() {
    console.log(this.mediaAdapterRef);
  }

}
