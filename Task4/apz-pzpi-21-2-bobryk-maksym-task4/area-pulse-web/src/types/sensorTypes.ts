import { ISector } from './sectorTypes';

export interface ISensor {
  id: number;
  name: string;
  sector: ISector;
}

export interface ICreateSensor {
  sensor: {
    name: string;
    sectorId: number;
  };
}

export interface IUpdateSensor {
  sensor: {
    name?: string;
    sectorId?: number;
  };
}
