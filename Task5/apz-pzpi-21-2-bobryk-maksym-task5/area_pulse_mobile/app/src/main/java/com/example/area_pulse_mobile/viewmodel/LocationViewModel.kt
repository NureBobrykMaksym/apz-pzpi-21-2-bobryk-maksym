package com.example.area_pulse_mobile.viewmodel

import android.content.SharedPreferences
import android.media.session.MediaSession.Token
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.area_pulse_mobile.model.Location.Location
import com.example.area_pulse_mobile.repository.LocationRepository
import kotlinx.coroutines.flow.*
import kotlinx.coroutines.launch

class LocationViewModel(
    private val locationRepository: LocationRepository,
    private val prefs: SharedPreferences
) : ViewModel() {

    private val _locations = MutableStateFlow<List<Location>>(emptyList())
    val locations: StateFlow<List<Location>> = _locations.asStateFlow() // Expose as read-only StateFlow

    private val _isLoading = MutableStateFlow(false)
    val isLoading: StateFlow<Boolean> = _isLoading.asStateFlow() // For showing loading indicator in UI

    private val _error = MutableSharedFlow<String>() // SharedFlow for one-time error events
    val error: SharedFlow<String> = _error.asSharedFlow()

    private val _analytics = MutableStateFlow<String>("")
    val analytics = _analytics.asStateFlow()


    init {
        fetchLocations()
    }

    private fun fetchLocations() = viewModelScope.launch {
        val token = prefs.getString("jwt", " ")

        try {
            println("locations")
            _locations.value = locationRepository.getLocations(token)
            print(_locations.value)
        } catch (e: Exception) {
            _error.emit("Error fetching locations: ${e.message}") // Emit error message
        }
    }

    fun getLocationAnalytics(locationId: Int) = viewModelScope.launch {
        val token = prefs.getString("jwt", " ")

        try {
            _analytics.value = locationRepository.getLocationAnalytics(token, locationId)
        } catch (e: Exception) {
            _error.emit("")
        }
    }
}