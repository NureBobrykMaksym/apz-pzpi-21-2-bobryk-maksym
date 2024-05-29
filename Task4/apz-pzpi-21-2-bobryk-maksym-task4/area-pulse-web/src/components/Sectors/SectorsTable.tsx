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
import { FC } from 'react';
import { sectorsApi } from '../../api/sectors';
import { ILocation } from '../../types/locationTypes';
import { ISector } from '../../types/sectorTypes';
import { ArrowRightIcon, DeleteIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';

type SectorsTableProps = {
  location: ILocation;
};

export const SectorsTable: FC<SectorsTableProps> = ({ location }) => {
  const tokenFromCookies: string | undefined = Cookies.get('token') || '';
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data } = useQuery({
    queryKey: ['sectors', tokenFromCookies],
    queryFn: async ({ queryKey }) => {
      const [, token] = queryKey;
      return await sectorsApi.getAllSectors(token, location.id);
    },
    enabled: !!tokenFromCookies,
  });

  const mutation = useMutation({
    mutationFn: (sectorId: number) => {
      return sectorsApi.deleteSector(sectorId, tokenFromCookies);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sectors'] });
    },
  });

  const onNavigateToSector = (sectorId: number) => {
    navigate(`/sectors/${sectorId}`);
  }

  return (
    <div>
      <p>{`${location.name} sectors`}</p>
      <TableContainer>
        <Table variant="simple">
          <TableCaption>Sectors Table</TableCaption>
          <Thead>
            <Tr>
              <Th>Id</Th>
              <Th>Name</Th>
              <Th>Attendance coefficient</Th>
              <Th textAlign={'right'}>Delete</Th>
              <Th textAlign={'right'}>See details</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data?.map((sector: ISector) => (
              <Tr key={sector.id}>
                <Td>{sector.id}</Td>
                <Td>{sector.name}</Td>
                <Td>{sector.attendanceCoefficient}</Td>
                <Td textAlign={'right'}>
                  <Button onClick={() => mutation.mutate(sector.id)}>
                    <DeleteIcon />
                  </Button>
                </Td>
                <Td textAlign={'right'}>
                  <Button onClick={() => onNavigateToSector(sector.id)}>
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
