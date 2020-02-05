import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MusicComponent} from './music/music.component';
import {SearchParamsResolverService} from './resolver/search-params-resolver.service';

const routes: Routes = [
  {
    path: '',
    component: MusicComponent,
    resolve: {
      searchParams: SearchParamsResolverService
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MusicRoutingModule { }
