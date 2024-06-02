import { Button, Input, InputGroup, InputRightElement } from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usersApi } from '../../api/users';
import { ILoginUser } from '../../types/userTypes';
import styles from './LoginForm.module.css';

export const LoginForm = () => {
  const [loginData, setLoginData] = useState<ILoginUser>({
    user: { email: '', password: '' },
  });
  const [show, setShow] = useState(false);

  const mutation = useMutation({
    mutationFn: (loginData: ILoginUser) => {
      return usersApi.login(loginData);
    },
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (mutation.isSuccess) {
      Cookies.set('token', mutation?.data.data.user.token);
      navigate('/locations');
      setLoginData({
        user: { email: '', password: '' },
      });
    }
  }, [mutation.isSuccess, navigate, mutation?.data?.data?.user?.token]);

  const handleClick = () => setShow(!show);

  const onHandleChange = (
    field: string,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setLoginData({
      user: {
        ...loginData.user,
        [field]: e.target.value,
      },
    });
  };

  const onSubmit = () => {
    if (!loginData.user.email.trim() || !loginData.user.password.trim()) {
      return;
    }

    mutation.mutate(loginData);
  };

  return (
    <form className={styles.formWrapper}>
      <Input
        placeholder="Email"
        value={loginData.user.email}
        onChange={(e) => onHandleChange('email', e)}
      />
      <InputGroup>
        <Input
          placeholder="Password"
          value={loginData.user.password}
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
        Log in
      </Button>
    </form>
  );
};
