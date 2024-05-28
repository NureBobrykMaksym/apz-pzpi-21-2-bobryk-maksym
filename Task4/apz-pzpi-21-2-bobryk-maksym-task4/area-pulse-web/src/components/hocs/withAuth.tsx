import { Spinner } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { usersApi } from '../../api/users';

const withAuth = (Component: FC) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (props: any) => {
    const tokenFromCookies: string | undefined = Cookies.get('token');
    const navigate = useNavigate();

    const { isPending, data, isError } = useQuery({
      queryKey: ['currentUser', tokenFromCookies],
      queryFn: ({ queryKey }) => {
        const [, token] = queryKey;
        if (typeof token === 'string') {
          return usersApi.getCurrentUser(token);
        } else {
          return Promise.reject(new Error('Token is missing'));
        }
      },
      enabled: !!tokenFromCookies, // Ensure the query only runs if the token is defined
    });

    useEffect(() => {
      if (isError) {
        navigate('/login');
      }
    }, [tokenFromCookies, navigate, data, isError, isPending]);

    return isPending ? (
      <Spinner thickness="3px" color="blueviolet" width={100} height={100} />
    ) : (
      <Component {...props} />
    );
  };
};

export default withAuth;