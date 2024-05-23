import { IAttendance } from "./attendanceTypes";

export interface ISector {
   id: number;
   name: string;
   attendanceCoefficient: number | null;
   attendances?: IAttendance[];
}

export interface ICreateSector {
  sector: {
    name: string;
    locationId: number;
  };
}

export interface IUpdateSector {
  sector: {
    name?: string;
    locationId?: number;
  };
}