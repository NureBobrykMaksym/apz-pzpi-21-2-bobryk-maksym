import { ArrowRightIcon, DeleteIcon } from '@chakra-ui/icons';
import {
  Button,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { locationsApi } from '../../api/locations';
import { ILocation } from '../../types/locationTypes';

export const LocationTable = () => {
  const tokenFromCookies: string = Cookies.get('token') || '';
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ['locations', tokenFromCookies],
    queryFn: async ({ queryKey }) => {
      const [, token] = queryKey;
      return locationsApi.getAllLocations(token);
    },
    enabled: !!tokenFromCookies,
  });

  const mutation = useMutation({
    mutationFn: (locationId: number) => {
      return locationsApi.deleteLocation(locationId, tokenFromCookies);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['locations'] });
    },
  });

  const onNavigateToLocation = (locationId: number) => {
    navigate(`/locations/${locationId}`);
  };

  return (
    <div>
      <p>Locations Table</p>
      <TableContainer border="1px solid #EDF2F7" borderRadius="20px">
        <Table variant="simple">
          <TableCaption mb="10px">Locations Table</TableCaption>
          <Thead>
            <Tr>
              <Th>Id</Th>
              <Th>Name</Th>
              <Th>Description</Th>
              <Th isNumeric>Area</Th>
              <Th textAlign={'right'}>Delete Location</Th>
              <Th textAlign={'right'}>See details</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data?.map((location: ILocation) => (
              <Tr key={location.id}>
                <Td>{location.id}</Td>
                <Td>{location.name}</Td>
                <Td>{location.description}</Td>
                <Td isNumeric>{location.area}</Td>
                <Td textAlign={'right'}>
                  <Button onClick={() => mutation.mutate(location.id)}>
                    <DeleteIcon />
                  </Button>
                </Td>
                <Td textAlign={'right'}>
                  <Button onClick={() => onNavigateToLocation(location.id)}>
                    <ArrowRightIcon />
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  );
};
