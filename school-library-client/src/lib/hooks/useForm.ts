import { useState } from 'react';

export const useForm = <T extends ILooseObject>(
  initial: T,
  validator?: { [key in keyof Partial<T>]: (e: T) => string | undefined }
) => {
  const [values, setValues] = useState(initial);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
  const [isLoading, setIsLoading] = useState(false);

  // Function to change the state
  const onChange = (obj: Partial<Record<keyof T, unknown>>) => {
    setValues((v) => ({ ...v, ...obj }));
    setErrors((e) => {
      Object.keys(obj).forEach((key) => delete e[key as Any]);

      return { ...e };
    });
  };

  // Validate all fields, return values if valid
  const validate = (): Record<keyof T, Any> | undefined => {
    const curErrors: typeof errors = {};

    Object.entries(validator || {}).forEach(([key, checker]) => {
      curErrors[key as Any] = checker(values[key]);
    });

    // Chek validity
    setErrors(curErrors);

    const isValid = Object.values(curErrors).every((x) => !x);
    if (!isValid) return undefined;
    return values;
  };

  const handleSubmit = (onSubmit?: (values: Record<keyof T, Any> | undefined) => void) => {
    const finalValues = validate();
    onSubmit?.(finalValues);
  };

  return {
    values,
    errors,
    onChange,
    validate,
    isLoading,
    setIsLoading,
    handleSubmit
  };
};
