import {InjectionToken} from '@angular/core';
import {Provider} from './shared/provider/provider';

export const SERVICE_PROVIDER = new InjectionToken<Provider>('ServiceProvider');
