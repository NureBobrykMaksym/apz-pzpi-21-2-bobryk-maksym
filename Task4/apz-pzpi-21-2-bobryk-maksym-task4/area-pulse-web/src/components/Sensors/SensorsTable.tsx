import { ArrowRightIcon, DeleteIcon } from '@chakra-ui/icons';
import {
  Button,
  Heading,
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
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { sensorsApi } from '../../api/sensors';
import { ISensor } from '../../types/sensorTypes';

type SensorsTableProps = {
  sectorName: string;
  sectorId: number;
};

export const SensorsTable: FC<SensorsTableProps> = ({
  sectorName,
  sectorId,
}) => {
  const { t } = useTranslation();
  const tokenFromCookies: string | undefined = Cookies.get('token') || '';
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data } = useQuery({
    queryKey: ['sensors', tokenFromCookies],
    queryFn: async ({ queryKey }) => {
      const [, token] = queryKey;
      return await sensorsApi.getAllSensor(token, sectorId);
    },
    enabled: !!tokenFromCookies,
  });

  const mutation = useMutation({
    mutationFn: (sensorId: number) => {
      return sensorsApi.deleteSensor(tokenFromCookies, sensorId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sensors'] });
    },
  });

  const onNavigateToSensor = (sensorId: number) => {
    navigate(`/sensors/${sensorId}`);
  };

  return (
    <div>
      <Heading as="h3" size="md" mb="12px">
        {`${t('sensorsForSector')} ${sectorName}`}
      </Heading>
      <TableContainer border="1px solid #EDF2F7" borderRadius="20px">
        <Table variant="simple">
          <TableCaption mb="10px">{t('sensorsTable')}</TableCaption>
          <Thead>
            <Tr>
              <Th>Id</Th>
              <Th>{t('name')}</Th>
              <Th textAlign={'right'}>{t('delete')}</Th>
              <Th textAlign={'right'}>{t('seeDetails')}</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data?.map((sensor: ISensor) => (
              <Tr key={sensor.id}>
                <Td>{sensor.id}</Td>
                <Td>{sensor?.name}</Td>
                <Td textAlign={'right'}>
                  <Button onClick={() => mutation.mutate(sensor?.id)}>
                    <DeleteIcon />
                  </Button>
                </Td>
                <Td textAlign={'right'}>
                  <Button onClick={() => onNavigateToSensor(sensor?.id)}>
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
