import {ChangeDetectionStrategy, Component, OnInit, Optional} from '@angular/core';
import {MediaAdapterRef} from '../media-adapter-ref';
import {DeezerContext} from '../../../shared/provider/deezer/deezer-context';

@Component({
  selector: 'app-deezer-adapter',
  templateUrl: './deezer-adapter.component.html',
  styleUrls: ['./deezer-adapter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeezerAdapterComponent implements OnInit {

  constructor(@Optional() private readonly mediaAdapterRef: MediaAdapterRef<DeezerContext>) { }

  ngOnInit() {
    console.log(this.mediaAdapterRef);
  }

}
