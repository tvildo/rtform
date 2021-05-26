import { useState } from 'react';
import { UseFieldResult } from './UseFieldResult';

export const useField = <T>(defaultValue: T): UseFieldResult<T> => {
  const [value, setValue] = useState(defaultValue);
  const [errorText, setErrorText] = useState('');

  const hasError = !!errorText;
  return {
    value,
    setValue,
    errorText,
    hasError,
    setErrorText,
  };
};
