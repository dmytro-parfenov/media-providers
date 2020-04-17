import {InjectionToken} from '@angular/core';
import {ItunesContext} from '../../shared/provider/itunes/itunes-context';

export const ITUNES_CONTEXT = new InjectionToken<ItunesContext>('itunes.context');
