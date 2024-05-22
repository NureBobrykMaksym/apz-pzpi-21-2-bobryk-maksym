import { Button, Input } from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { usersApi } from '../../api/users';
import { ICreateUser } from '../../types/userTypes';
import styles from './SignUpForm.module.css';

export const SignUpForm = () => {
  const [signUpData, setSignUpData] = useState<ICreateUser>({
    user: { email: '', password: '', username: '' },
  });

  const mutation = useMutation({
    mutationFn: (newUserData: ICreateUser) => {
      return usersApi.signUp(newUserData);
    },
  });

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
      <Input
        placeholder="Password"
        value={signUpData.user.password}
        onChange={(e) => onHandleChange('password', e)}
      />
      <Button onClick={onSubmit} colorScheme="purple" w={200}>
        Sign Up
      </Button>
    </form>
  );
};
