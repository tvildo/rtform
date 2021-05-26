import { UseFieldResult } from '../core/UseFieldResult';

export const validateRequired = (field: UseFieldResult<any>, errorText: string) => {
  if (typeof field.value === 'string' && field.value && field.value.trim() === '') {
    field.setErrorText(errorText);
    return false;
  }

  if (field.value) {
    field.setErrorText('');
    return true;
  }

  field.setErrorText(errorText);
  return false;
};
