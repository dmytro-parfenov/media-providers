import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MusicComponent} from './music/music.component';
import {MusicRoutingModule} from './music-routing.module';
import {DeezerDataService} from './shared/api/deezer-data.service';
import {ItunesDataService} from './shared/api/itunes-data.service';
import {DeezerProviderService} from './provider/deezer/deezer-provider.service';
import {ItunesProviderService} from './provider/itunes/itunes-provider.service';
import {SearchService} from './search.service';
import {SERVICE_PROVIDERS} from './service-key.provider';


@NgModule({
  declarations: [MusicComponent],
  imports: [
    CommonModule,
    MusicRoutingModule
  ],
  providers: [
    DeezerDataService,
    ItunesDataService,
    SearchService,
    {provide: SERVICE_PROVIDERS, useClass: DeezerProviderService, multi: true},
    {provide: SERVICE_PROVIDERS, useClass: ItunesProviderService, multi: true}
  ]
})
export class MusicModule { }
