import { useNavigate } from 'react-router';

import { useForm } from 'lib/hooks/useForm.ts';
import { schema } from 'lib/validator.ts';

const useData = () => {
  const navigate = useNavigate();
  const { values, onChange, errors, handleSubmit } = useForm(
    { email: '', password: '', full_name: '' },
    {
      email: (e) => schema.string().label('email').email().validate(e),
      full_name: (e) => schema.string().label('full name').min(3).validate(e),
      password: (e) => schema.string().label('password').min(8).validate(e)
    }
  );

  return {
    navigate,
    values,
    onChange,
    errors,
    handleSubmit
  };
};

export default useData;
