import {DeezerEntityType} from '../../../../shared/api/deezer/deezer-entity-type.enum';

export interface DeezerContextTypeAware {
  type: DeezerEntityType;
}
