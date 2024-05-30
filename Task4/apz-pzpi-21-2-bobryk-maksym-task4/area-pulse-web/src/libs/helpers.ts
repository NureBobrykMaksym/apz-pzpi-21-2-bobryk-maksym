import { ILocation } from '../types/locationTypes';

interface Attendance {
  id: number;
  name: string;
  createdDate: string;
  updatedDate: string;
  sectorName?: string; // Optional property to include sector name
}

export const makeAttendancesArray = (location: ILocation | undefined): Attendance[] => {
  const attendancesArray: Attendance[] = [];
  if (!location) return attendancesArray;
  if (!location.sectors) return attendancesArray;

  location?.sectors?.forEach((sector) => {
    sector?.attendances?.forEach((attendance) => {
      const attendanceWithSectorName: Attendance = {
        ...attendance,
        sectorName: sector.name,
      };
      attendancesArray.push(attendanceWithSectorName);
    });
  });

  return attendancesArray;
};
