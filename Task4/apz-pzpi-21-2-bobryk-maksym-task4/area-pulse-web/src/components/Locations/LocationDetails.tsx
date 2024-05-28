import Cookies from 'js-cookie';
import { useParams } from 'react-router-dom';
import { locationsApi } from '../../api/locations';
import { useQuery } from '@tanstack/react-query';

export const LocationDetails = () => {
  const { locatioId } = useParams();
  const tokenFromCookies: string | undefined = Cookies.get('token');

  const { data } = useQuery({
    queryKey: ['location', tokenFromCookies],
    queryFn: async ({ queryKey }) => {
      const [, token] = queryKey;
      if (typeof token === 'string' && locatioId) {
        return await locationsApi.getLocationById(+locatioId, token);
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
