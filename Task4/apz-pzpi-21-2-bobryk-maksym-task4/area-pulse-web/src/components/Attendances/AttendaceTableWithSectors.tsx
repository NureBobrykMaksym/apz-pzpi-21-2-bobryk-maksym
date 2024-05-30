import {
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
import { locationsApi } from '../../api/locations';
import { makeAttendancesArray } from '../../libs/helpers';

type AttendanceTableWithSectorsProps = {
  locationId: string;
};

export const AttendanceTableWithSectors: FC<
  AttendanceTableWithSectorsProps
> = ({ locationId }) => {
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
      <p>Attendance Table</p>
      <TableContainer>
        <Table variant="simple">
          <TableCaption>Current Serctor Attendances Table</TableCaption>
          <Thead>
            <Tr>
              <Th>Id</Th>
              <Th>Name</Th>
              <Th>Captured at</Th>
              <Th>Sector</Th>
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
