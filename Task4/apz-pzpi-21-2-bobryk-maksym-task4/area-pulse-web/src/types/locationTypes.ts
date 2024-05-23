import { IUser } from './userTypes';

export interface ILocation {
  id: number;
  name: string;
  description: string;
  area: number;
  user?: IUser;
}

export interface ICreateLocation {
  location: {
    name: string;
    description: string;
    area: number;
  };
}

export interface IUpdateLocation {
  location: {
    name?: string;
    description?: string;
    area?: number;
  };
}
