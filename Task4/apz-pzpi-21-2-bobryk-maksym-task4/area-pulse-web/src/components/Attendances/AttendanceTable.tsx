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
import { FC } from 'react';
import { IAttendance } from '../../types/attendanceTypes';

type AttendanceTableProps = {
  attendances: IAttendance[];
};

export const AttendanceTable: FC<AttendanceTableProps> = ({ attendances }) => {
  return (
    <div>
      <p>Attendance Table</p>
      <TableContainer border="1px solid #EDF2F7" borderRadius="20px">
        <Table variant="simple">
          <TableCaption mb="10px">Current Serctor Attendances Table</TableCaption>
          <Thead>
            <Tr>
              <Th>Id</Th>
              <Th>Name</Th>
              <Th>Captured at</Th>
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
