import {ChangeDetectionStrategy, Component, Inject, OnInit, Optional} from '@angular/core';
import {ITUNES_CONTEXT} from './itunes-context-key';
import {ItunesContext} from '../../shared/provider/itunes/itunes-context';

@Component({
  selector: 'app-itunes',
  templateUrl: './itunes.component.html',
  styleUrls: ['./itunes.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItunesComponent implements OnInit {

  constructor(@Optional() @Inject(ITUNES_CONTEXT) private readonly context: ItunesContext) { }

  ngOnInit() {
    console.log(this.context);
  }

}
