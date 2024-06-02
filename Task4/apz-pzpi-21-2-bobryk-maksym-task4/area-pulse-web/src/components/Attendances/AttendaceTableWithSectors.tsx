import {
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
import { useQuery } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { locationsApi } from '../../api/locations';
import { makeAttendancesArray } from '../../libs/helpers';

type AttendanceTableWithSectorsProps = {
  locationId: string;
  locationName: string | undefined;
};

export const AttendanceTableWithSectors: FC<
  AttendanceTableWithSectorsProps
> = ({ locationId, locationName }) => {
  const { t } = useTranslation();
  const tokenFromCookies = Cookies.get('token') || '';
  const { data } = useQuery({
    queryKey: ['attendances', locationId, tokenFromCookies],
    queryFn: async ({ queryKey }) => {
      const [, locationId, token] = queryKey;
      return locationsApi.getAllLocationWithAllAttendances(+locationId, token);
    },
    enabled: !!locationId,
  });

  const refactoredData = makeAttendancesArray(data);
  return (
    <div>
      <Heading as="h3" size="md" mb="20px">
        {`${t('locationAttendances')}${locationName}`}
      </Heading>
      <TableContainer border="1px solid #EDF2F7" borderRadius="20px">
        <Table variant="simple">
          <TableCaption mb="10px">
            {t('currentLocationAttendances')}
          </TableCaption>
          <Thead>
            <Tr>
              <Th>Id</Th>
              <Th>{t('name')}</Th>
              <Th>{t('captured')}</Th>
              <Th>{t('sector')}</Th>
            </Tr>
          </Thead>
          <Tbody>
            {refactoredData?.map((attendance) => (
              <Tr key={attendance.id}>
                <Td>{attendance.id}</Td>
                <Td>{attendance.name}</Td>
                <Td>{attendance.createdDate}</Td>
                <Td>{attendance.sectorName}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  );
};
