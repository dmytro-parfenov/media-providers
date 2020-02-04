import {InjectionToken} from '@angular/core';
import {Provider} from './provider/provider';

export const SERVICE_PROVIDERS = new InjectionToken<Provider>('ServiceProviders');
