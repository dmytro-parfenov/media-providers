import {InjectionToken} from '@angular/core';
import {Provider} from './provider/provider';

export const SERVICE_PROVIDER = new InjectionToken<Provider>('ServiceProvider');
