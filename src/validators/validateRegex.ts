import { UseFieldResult } from '../core/UseFieldResult';

export const validateRegex = (field: UseFieldResult<any>, regex: RegExp, errorText: string) => {
  if (regex.test(field.value)) {
    field.setErrorText('');
    return true;
  }

  field.setErrorText(errorText);
  return false;
};
