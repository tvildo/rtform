import { UseFieldResult } from '../core/UseFieldResult';

export interface MaskedFieldResult extends UseFieldResult<string> {
  maskedValue: string;
  maxLength: number;
}
