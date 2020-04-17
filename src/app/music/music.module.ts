import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MusicComponent} from './music/music.component';
import {MusicRoutingModule} from './music-routing.module';
import {DeezerDataService} from './shared/api/deezer-data.service';
import {ItunesDataService} from './shared/api/itunes-data.service';
import {DeezerProviderService} from './music/shared/provider/deezer/deezer-provider.service';
import {ItunesProviderService} from './music/shared/provider/itunes/itunes-provider.service';
import {SearchService} from './music/search.service';
import {SERVICE_PROVIDER} from './music/service-provider';
import {SearchParamsResolverService} from './resolver/search-params-resolver.service';
import {SearchParamsService} from './music/search-params.service';
import {MediaComponent} from './music/media/media.component';
import {ItunesComponent} from './music/media/itunes/itunes.component';
import {DeezerComponent} from './music/media/deezer/deezer.component';
import {PortalModule} from '@angular/cdk/portal';


@NgModule({
  declarations: [MusicComponent, MediaComponent, ItunesComponent, DeezerComponent],
  imports: [
    CommonModule,
    MusicRoutingModule,
    PortalModule
  ],
  providers: [
    DeezerDataService,
    ItunesDataService,
    SearchService,
    SearchParamsResolverService,
    SearchParamsService,
    {provide: SERVICE_PROVIDER, useClass: DeezerProviderService, multi: true},
    {provide: SERVICE_PROVIDER, useClass: ItunesProviderService, multi: true}
  ]
})
export class MusicModule { }
