import {InjectionToken} from '@angular/core';
import {DeezerContext} from '../../shared/provider/deezer/deezer-context';

export const DEEZER_CONTEXT = new InjectionToken<DeezerContext>('deezer.context');
