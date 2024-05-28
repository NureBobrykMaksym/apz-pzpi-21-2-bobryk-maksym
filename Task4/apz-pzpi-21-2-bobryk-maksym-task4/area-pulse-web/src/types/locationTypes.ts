import { IAttendance } from './attendanceTypes';
import { IUser } from './userTypes';

export interface ILocation {
  id: number;
  name: string;
  description: string;
  area: number;
  user?: IUser;
  attendances?: IAttendance[];
}

export interface ICreateLocation {
  location: {
    name: string;
    description: string;
    area: number | null;
  };
}

export interface IUpdateLocation {
  location: {
    name?: string;
    description?: string;
    area?: number;
  };
}