package com.example.area_pulse_mobile

import android.content.Context
import android.content.SharedPreferences
import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.*
import androidx.navigation.compose.*
import com.example.area_pulse_mobile.model.Location.LocationApiImpl
import com.example.area_pulse_mobile.model.User.UserApiImpl
import com.example.area_pulse_mobile.network.HttpClientProvider.client
import com.example.area_pulse_mobile.pages.*
import com.example.area_pulse_mobile.repository.*
import com.example.area_pulse_mobile.ui.theme.Area_pulse_mobileTheme
import com.example.area_pulse_mobile.viewmodel.*


class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        val prefs = getSharedPreferences("jwt", Context.MODE_PRIVATE)

        enableEdgeToEdge()
        setContent {
            Area_pulse_mobileTheme {
                Scaffold(modifier = Modifier.fillMaxSize()) { innerPadding ->
                    Column(modifier = Modifier.padding(innerPadding)) {
                        App(prefs)
                    }
                }
            }
        }
    }
}

@Composable
fun App(prefs: SharedPreferences) {
    val userApi = UserApiImpl(client)
    val userRepository = UserRepositoryImpl(userApi)
    val userViewModel = UserViewModel(userRepository, prefs)

    val locationApi = LocationApiImpl(client)
    val locationRepository = LocationRepositoryImpl(locationApi)
    val locationViewModel = LocationViewModel(locationRepository, prefs)

    val navController = rememberNavController()

    NavHost(navController = navController, startDestination = "login_page") {
        composable("login_page") {
            LoginPage(viewModel = userViewModel, onLoginSuccess = { navController.navigate("location_page") })
        }
        composable("location_page") {
            LocationPage(viewModel = locationViewModel, onNavigateToLocationAnalyticsClick = {
                location -> navController.navigate("location_analytics/${location.id}")
            })
        }
        composable("location_analytics/{locationId}") { backStackEntry ->
            val locationId = backStackEntry.arguments?.getString("locationId")?.toIntOrNull()
            val selectedLocation = locationId?.let { locationViewModel.locations.value.find { it.id == locationId} }
            selectedLocation?.let { location ->
                LocationAnalyticsPage(viewModel = locationViewModel, location)
            }
        }
    }
}
