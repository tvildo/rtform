import { UseFieldResult } from '../core/UseFieldResult';

export const validateSameValue = (fields: UseFieldResult<any>[], errorText: string) => {
  if (!(fields?.length >= 2)) {
    throw new Error('Same value validator expects at least two fields');
  }

  const firstVal = fields[0].value;
  for (let i = 1; i < fields.length; i++) {
    if (firstVal !== fields[i].value) {
      fields.forEach((x) => x.setErrorText(errorText));
      return false;
    }
  }

  fields.forEach((x) => x.setErrorText(''));
  return true;
};
