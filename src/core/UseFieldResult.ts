import { Dispatch, SetStateAction } from 'react';

export interface UseFieldResult<T> {
  value: T;
  setValue: Dispatch<SetStateAction<T>>;
  errorText: string;
  hasError: boolean;
  setErrorText: Dispatch<SetStateAction<string>>;
}
