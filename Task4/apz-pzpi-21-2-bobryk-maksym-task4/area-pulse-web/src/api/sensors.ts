import { apiInstance } from '../libs/axios';
import { ICreateSensor, ISensor, IUpdateSensor } from '../types/sensorTypes';
import { DeleteResult } from '../types/sharedTypes';

export const sensorsApi = {
  getAllSensor: async (token: string, sectorId: number): Promise<ISensor[]> => {
    const response = await apiInstance.get(`/sensors/?sectorId=${sectorId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  },
  getSensorById: async (token: string, id: number): Promise<ISensor> => {
    const response = await apiInstance.get(`/sensors/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  },
  createSensor: async (token: string, data: ICreateSensor): Promise<ISensor> =>
    apiInstance.post('/sensors', data, {
      headers: { Authorization: `Bearer ${token}` },
    }),
  updateSensor: async (
    token: string,
    id: number,
    data: IUpdateSensor
  ): Promise<ISensor> =>
    apiInstance.patch(`/sensors/${id}`, data, {
      headers: { Authorization: `Bearer ${token}` },
    }),
  deleteSensor: async (token: string, id: number): Promise<DeleteResult> =>
    apiInstance.delete(`/sensors/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    }),
};
