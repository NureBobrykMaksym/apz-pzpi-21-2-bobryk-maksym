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
import { FC } from 'react';
import { IAttendance } from '../../types/attendanceTypes';
import { useTranslation } from 'react-i18next';

type AttendanceTableProps = {
  attendances: IAttendance[];
};

export const AttendanceTable: FC<AttendanceTableProps> = ({ attendances }) => {
  const { t } = useTranslation();

  return (
    <div>
      <Heading as="h3" size="md" mb="12px">
        {t('currentSectorAttendances')}
      </Heading>
      <TableContainer border="1px solid #EDF2F7" borderRadius="20px">
        <Table variant="simple">
          <TableCaption mb="10px">{t('currentSectorAttendances')}</TableCaption>
          <Thead>
            <Tr>
              <Th>Id</Th>
              <Th>{t('name')}</Th>
              <Th>{t('captured')}</Th>
            </Tr>
          </Thead>
          <Tbody>
            {attendances?.map((attendance: IAttendance) => (
              <Tr key={attendance.id}>
                <Td>{attendance.id}</Td>
                <Td>{attendance.name}</Td>
                <Td>{attendance.createdDate}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  );
};
