import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-itunes',
  templateUrl: './itunes.component.html',
  styleUrls: ['./itunes.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItunesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
