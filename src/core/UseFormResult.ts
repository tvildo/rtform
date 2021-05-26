export interface UseFormResult {
  isValid: boolean;
  isSubmited: boolean;
  setIsSubmited: (val: boolean) => void;
  errors: string[];
  setErrors: (params: string[]) => void;
  isValidating: boolean;
  validate: () => Promise<boolean>;
}
