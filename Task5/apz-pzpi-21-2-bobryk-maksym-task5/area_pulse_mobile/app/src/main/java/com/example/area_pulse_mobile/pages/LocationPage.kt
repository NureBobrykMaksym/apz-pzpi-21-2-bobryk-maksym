package com.example.area_pulse_mobile.pages

import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.material.icons.*
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.*
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp
import com.example.area_pulse_mobile.model.Location.Location
import com.example.area_pulse_mobile.viewmodel.LocationViewModel

@Composable
fun LocationPage(viewModel: LocationViewModel, onNavigateToLocationAnalyticsClick: (Location) -> Unit) {
    val locations = viewModel.locations.collectAsState()

    Scaffold { padding ->
        Column {
            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(16.dp),
                verticalAlignment = Alignment.CenterVertically
            ) {
                Text(
                    text = "All locations",
                    style = MaterialTheme.typography.headlineMedium,
                    modifier = Modifier.weight(1f)
                )
            }

            LazyColumn(contentPadding = padding) {
                items(locations.value.size) { index ->
                    val location = locations.value[index]
                    LocationItem(location, onNavigateToLocationAnalyticsClick)
                }
            }
        }
    }
}

@Composable
fun LocationItem(
    location: Location,
    onNavigateToLocationAnalyticsClick: (Location) -> Unit
) {
    Card(
        modifier = Modifier
            .fillMaxWidth()
            .padding(16.dp),
        colors = CardDefaults.cardColors(Color(0xFF8A2BE2))
    ) {
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(8.dp),
            verticalAlignment = Alignment.CenterVertically,
            horizontalArrangement = Arrangement.SpaceBetween,
        ) {
            Column {
                Text(
                    text = location.name,
                    style = MaterialTheme.typography.bodyLarge,
                    color = Color.White
                )
                Text(
                    text = location.description,
                    style = MaterialTheme.typography.bodySmall,
                    modifier = Modifier.width(300.dp),
                    color = Color.White
                )
                Text(
                    text = "Area: ${location.area} m^3",
                    style = MaterialTheme.typography.bodySmall,
                    color = Color.White
                )
            }
            Row {

                IconButton(
                    onClick = { onNavigateToLocationAnalyticsClick(location) }
                ) {
                    Icon(
                        imageVector = Icons.Default.ArrowForward,
                        contentDescription = "Get analytics",
                        tint = Color.White
                    )
                }
            }
        }
    }
}