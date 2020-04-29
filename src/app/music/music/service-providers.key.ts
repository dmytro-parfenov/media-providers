import {InjectionToken} from '@angular/core';
import {Provider} from './shared/provider/provider';

export const SERVICE_PROVIDERS = new InjectionToken<Provider>('service_providers');
