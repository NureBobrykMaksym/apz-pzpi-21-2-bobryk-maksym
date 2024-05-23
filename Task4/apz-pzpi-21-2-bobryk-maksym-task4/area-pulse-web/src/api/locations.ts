import { apiInstance } from '../libs/axios';
import {
  ICreateLocation,
  ILocation,
  IUpdateLocation,
} from '../types/locationTypes';
import { DeleteResult } from '../types/sharedTypes';

export const locationsApi = {
  getAllLocations: async (token: string): Promise<ILocation> =>
    apiInstance.get('/locations', {
      headers: { Authorization: `Bearer ${token}` },
    }),
  getLocationById: async (id: number, token: string): Promise<ILocation> =>
    apiInstance.get(`/locations/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    }),
  getLocationWithAttendances: async (id: number, token: string) =>
    apiInstance.get(`/locations/${id}/attendances`, {
      headers: { Authorization: `Bearer ${token}` },
    }),
  createLocation: async (
    data: ICreateLocation,
    token: string
  ): Promise<ILocation> =>
    apiInstance.post('/locations', data, {
      headers: { Authorization: `Bearer ${token}` },
    }),
  updateLocation: async (
    id: number,
    data: IUpdateLocation,
    token: string
  ): Promise<ILocation> =>
    apiInstance.patch(`/locations/${id}`, data, {
      headers: { Authorization: `Bearer ${token}` },
    }),
  deleteLocation: async (id: number, token: string): Promise<DeleteResult> =>
    apiInstance.delete(`/locations/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    }),
};
