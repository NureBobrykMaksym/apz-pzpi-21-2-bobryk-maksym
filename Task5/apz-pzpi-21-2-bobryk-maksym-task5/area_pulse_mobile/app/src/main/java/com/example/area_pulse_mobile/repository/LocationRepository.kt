package com.example.area_pulse_mobile.repository

import com.example.area_pulse_mobile.model.Location.Location
import com.example.area_pulse_mobile.model.Location.LocationApi

interface LocationRepository {
    suspend fun getLocations(token: String?): List<Location>
    suspend fun getLocationAnalytics(token: String?, locationId: Int): String
}

class LocationRepositoryImpl(private val LocationApi: LocationApi) : LocationRepository {

    override suspend fun getLocations(token: String?): List<Location> {
        return try {
            LocationApi.getLocations(token)
        } catch (e: Exception) {
            println(e)
            emptyList()
        }
    }

    override suspend fun getLocationAnalytics(token: String?, locationId: Int): String {
        return try {
            LocationApi.getLocationAnalytics(token, locationId)
        } catch (e: Exception) {
            ""
        }
    }
}