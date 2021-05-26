import { UseFieldResult } from '../core/UseFieldResult';

export const emailRegex =
  /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

export const validateEmail = (field: UseFieldResult<any>, errorText: string) => {
  if (emailRegex.test(field.value)) {
    field.setErrorText('');
    return true;
  }

  field.setErrorText(errorText);
  return false;
};

export const valRegex = (field: UseFieldResult<any>, regex: RegExp, errorText: string) => {
  if (regex.test(field.value)) {
    field.setErrorText('');
    return true;
  }

  field.setErrorText(errorText);
  return false;
};
