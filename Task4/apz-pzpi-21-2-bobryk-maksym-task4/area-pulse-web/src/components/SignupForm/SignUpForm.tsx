import { Button, Input, InputGroup, InputRightElement } from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usersApi } from '../../api/users';
import { ICreateUser } from '../../types/userTypes';
import styles from './SignUpForm.module.css';

export const SignUpForm = () => {
  const [signUpData, setSignUpData] = useState<ICreateUser>({
    user: { email: '', password: '', username: '' },
  });
  const [show, setShow] = useState(false);

  const mutation = useMutation({
    mutationFn: (newUserData: ICreateUser) => {
      return usersApi.signUp(newUserData);
    },
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (mutation.isSuccess) {
      navigate('/login');
      setSignUpData({
        user: { email: '', password: '', username: '' },
      });
    }
  }, [mutation.isSuccess, navigate]);

  const handleClick = () => setShow(!show);

  const onHandleChange = (
    field: string,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSignUpData({
      user: {
        ...signUpData.user,
        [field]: e.target.value,
      },
    });
  };

  const onSubmit = () => {
    if (
      !signUpData.user.email.trim() ||
      !signUpData.user.password.trim() ||
      !signUpData.user.username.trim()
    ) {
      return;
    }

    mutation.mutate(signUpData);
  };

  return (
    <form className={styles.formWrapper}>
      <Input
        placeholder="Username"
        value={signUpData.user.username}
        onChange={(e) => onHandleChange('username', e)}
      />
      <Input
        placeholder="Email"
        value={signUpData.user.email}
        onChange={(e) => onHandleChange('email', e)}
      />
      <InputGroup>
        <Input
          placeholder="Password"
          value={signUpData.user.password}
          onChange={(e) => onHandleChange('password', e)}
          type={show ? 'text' : 'password'}
        />
        <InputRightElement width="4.5rem">
          <Button h="1.75rem" size="sm" onClick={handleClick}>
            {show ? 'Hide' : 'Show'}
          </Button>
        </InputRightElement>
      </InputGroup>
      <Button onClick={onSubmit} colorScheme="purple" w={200}>
        Sign Up
      </Button>
    </form>
  );
};
