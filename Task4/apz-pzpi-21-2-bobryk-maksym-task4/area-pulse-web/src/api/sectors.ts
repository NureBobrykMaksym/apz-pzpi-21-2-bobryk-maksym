import { apiInstance } from '../libs/axios';
import { ICreateSector, ISector, IUpdateSector } from '../types/sectorTypes';
import { DeleteResult } from '../types/sharedTypes';

export const sectorsApi = {
  getAllSectors: async (
    token: string,
    locationId: number
  ): Promise<ISector[] | []> => {
    const response = await apiInstance.get(`/sectors?locationId=${locationId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  },
  getSectorById: async (id: number, token: string): Promise<ISector> => {
    const response = await apiInstance.get(`/sectors/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },
  createSector: async (
    data: ICreateSector,
    token: string
  ): Promise<ISector> => {
    return await apiInstance.post('/sectors', data, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },
  updateSector: async (
    id: number,
    data: IUpdateSector,
    token: string
  ): Promise<ISector> => {
    const response = await apiInstance.patch(`/sectors/${id}`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },
  deleteSector: async (id: number, token: string): Promise<DeleteResult> => {
    return await apiInstance.delete(`/sectors/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },
};
