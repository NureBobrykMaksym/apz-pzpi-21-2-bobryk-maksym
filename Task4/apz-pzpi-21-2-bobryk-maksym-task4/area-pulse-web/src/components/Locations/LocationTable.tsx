import { useMutation, useQuery } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import { locationsApi } from '../../api/locations';

export const LocationTable = () => {
  const tokenFromCookies: string | undefined = Cookies.get('token');

  const { isPending, data, isError } = useQuery({
    queryKey: ['locations', tokenFromCookies],
    queryFn: ({ queryKey }) => {
      const [, token] = queryKey;
      if (typeof token === 'string') {
        return locationsApi.getAllLocations(token);
      } else {
        return Promise.reject(new Error('Token is missing'));
      }
    },
    enabled: !!tokenFromCookies,
  });

  const mutation = useMutation({
    mutationFn: (locationId: number) => {
      return locationsApi.deleteLocation(locationId, tokenFromCookies);
    },
  });

  return <div>Locations Table</div>;
};
