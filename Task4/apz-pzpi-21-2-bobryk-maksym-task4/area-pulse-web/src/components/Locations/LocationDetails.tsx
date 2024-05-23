import { useQuery } from '@chakra-ui/react';
import Cookies from 'js-cookie';
import { useParams } from 'react-router-dom';
import { locationsApi } from '../../api/locations';

export const LocationDetails = () => {
  const { locatioId } = useParams();
  const tokenFromCookies: string | undefined = Cookies.get('token');

  const { isPending, data, isError } = useQuery({
    queryKey: ['location', tokenFromCookies],
    queryFn: ({ queryKey }) => {
      const [, token] = queryKey;
      if (typeof token === 'string' && locatioId) {
        return locationsApi.getLocationById(+locatioId, token);
      } else {
        return Promise.reject(new Error('Token is missing'));
      }
    },
    enabled: !!tokenFromCookies,
  });

  return (
    <div>Location details</div>
  )
};
