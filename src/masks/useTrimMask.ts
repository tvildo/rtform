import { Dispatch, SetStateAction } from 'react';
import { UseFieldResult } from '../core/UseFieldResult';

export const useTrimMask = (field: UseFieldResult<string>): UseFieldResult<string> => {
  const handleChange: Dispatch<SetStateAction<string>> = (v) => {
    const trimmed = v ? v.toString().trim() : v;
    field.setValue(trimmed);
  };

  return {
    ...field,
    setValue: handleChange,
  };
};
