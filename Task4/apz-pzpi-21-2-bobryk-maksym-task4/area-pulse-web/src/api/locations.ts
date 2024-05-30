import { apiInstance } from '../libs/axios';
import {
  ICreateLocation,
  ILocation,
  IUpdateLocation,
} from '../types/locationTypes';
import { DeleteResult } from '../types/sharedTypes';

export const locationsApi = {
  getAllLocations: async (token: string): Promise<ILocation[]> => {
    try {
      const response = await apiInstance.get('/locations', {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      throw new Error("Couldn't fetch locations");
    }
  },
  getAllLocationWithAllAttendances: async (locationId: number, token: string): Promise<ILocation> => {
    try {
      const response = await apiInstance.get(`/locations/${locationId}/attendances-all`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      throw new Error("Couldn't fetch locations");
    }
  },
  getLocationById: async (id: number, token: string): Promise<ILocation> => {
    try {
      const response = await apiInstance.get(`/locations/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      throw new Error("Couldn't fetch location by id");
    }
  },
  getLocationWithAttendances: async (
    id: number,
    token: string
  ): Promise<ILocation> => {
    try {
      const response = await apiInstance.get(`/locations/${id}/attendances`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      throw new Error("Couldn't fetch location with attendances");
    }
  },
  createLocation: async (
    data: ICreateLocation,
    token: string
  ): Promise<ILocation> => {
    try {
      const response = await apiInstance.post('/locations', data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      throw new Error("Couldn't create location");
    }
  },
  updateLocation: async (
    id: number,
    data: IUpdateLocation,
    token: string
  ): Promise<ILocation> => {
    try {
      const response = await apiInstance.patch(`/locations/${id}`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      throw new Error("Couldn't update location");
    }
  },
  deleteLocation: async (id: number, token: string): Promise<DeleteResult> =>
    apiInstance.delete(`/locations/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    }),
};
