import { useNavigate } from 'react-router';

import { useForm } from 'lib/hooks/useForm.ts';
import { schema } from 'lib/validator.ts';

const useData = () => {
  const navigate = useNavigate();
  const { values, onChange, errors, handleSubmit, isLoading, setIsLoading } = useForm(
    { email: '', password: '' },
    {
      email: (e) => schema.string().label('email').email().validate(e),
      password: (e) => schema.string().label('password').min(8).validate(e)
    }
  );

  return {
    navigate,
    values,
    onChange,
    errors,
    handleSubmit,
    isLoading,
    setIsLoading
  };
};

export default useData;
