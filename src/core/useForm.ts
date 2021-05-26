import { useState, useCallback, useEffect } from 'react';
import { UseFormResult } from './UseFormResult';

export const useForm = (validateFunc: () => Promise<boolean>): UseFormResult => {
  const [isFormValid, setFormIsValid] = useState(false);
  const [isSubmited, setIsSubmited] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  const validate = useCallback(async (): Promise<boolean> => {
    setIsSubmited(true);
    setIsValidating(true);
    let isValid = false;
    try {
      isValid = await Promise.resolve(validateFunc());
    } catch (err) {
      isValid = false;
    } finally {
      setIsValidating(false);
    }
    setFormIsValid(isValid);
    return isValid;
  }, [validateFunc]);

  // Validate form again on any change
  useEffect(() => {
    if (isSubmited) {
      validate();
    }
  }, [isSubmited, validate]);

  return {
    isValid: isFormValid,
    isSubmited,
    setIsSubmited,
    errors,
    setErrors,
    isValidating,
    validate,
  };
};
