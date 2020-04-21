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
import {ItunesAdapterComponent} from './music/media/adapter/itunes-adapter/itunes-adapter.component';
import {DeezerAdapterComponent} from './music/media/adapter/deezer-adapter/deezer-adapter.component';
import {PortalModule} from '@angular/cdk/portal';
import {ItunesAlbumComponent} from './music/media/adapter/itunes-adapter/adapter/itunes-album/itunes-album.component';
import {DeezerAlbumComponent} from './music/media/adapter/deezer-adapter/adapter/deezer-album/deezer-album.component';
import { BaseAdapterComponent } from './music/media/adapter/base-adapter/base-adapter.component';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';


@NgModule({
  declarations: [
    MusicComponent,
    MediaComponent,
    ItunesAdapterComponent,
    DeezerAdapterComponent,
    ItunesAlbumComponent,
    DeezerAlbumComponent,
    BaseAdapterComponent
  ],
  imports: [
    CommonModule,
    MusicRoutingModule,
    PortalModule,
    MatCardModule,
    MatButtonModule
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
