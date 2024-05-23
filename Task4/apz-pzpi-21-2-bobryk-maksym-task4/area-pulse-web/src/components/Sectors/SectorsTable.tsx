import { useMutation, useQuery } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import { locationsApi } from '../../api/locations';
import { sectorsApi } from '../../api/sectors';
import { FC } from 'react';

type SectorsTableProps = {
  locationId: number;
}

export const SectorsTable: FC<SectorsTableProps> = ({ locationId }) => {
  const tokenFromCookies: string | undefined = Cookies.get('token');

  const { isPending, data, isError } = useQuery({
    queryKey: ['locations', tokenFromCookies],
    queryFn: ({ queryKey }) => {
      const [, token] = queryKey;
      if (typeof token === 'string') {
        return sectorsApi.getAllSectors(token, locationId);
      } else {
        return Promise.reject(new Error('Token is missing'));
      }
    },
    enabled: !!tokenFromCookies,
  });

  const mutation = useMutation({
    mutationFn: (sectorId: number) => {
      return sectorsApi.deleteSector(sectorId, tokenFromCookies);
    },
  });

  return <div>Sectors Table</div>;
};
