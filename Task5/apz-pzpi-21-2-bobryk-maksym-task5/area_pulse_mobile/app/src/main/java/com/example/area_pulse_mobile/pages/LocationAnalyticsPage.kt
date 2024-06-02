package com.example.area_pulse_mobile.pages

import androidx.compose.foundation.layout.*
import androidx.compose.material3.Scaffold
import androidx.compose.runtime.*
import androidx.compose.ui.*
import androidx.compose.ui.unit.dp
import com.example.area_pulse_mobile.model.Location.Location
import com.example.area_pulse_mobile.viewmodel.LocationViewModel
import com.meetup.twain.*

@Composable
fun LocationAnalyticsPage(viewModel: LocationViewModel, location: Location)  {
    val analytics by viewModel.analytics.collectAsState()

    LaunchedEffect(location.id) {
        viewModel.getLocationAnalytics(location.id)
    }

    Scaffold { padding ->
        Column {
            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(16.dp),
                verticalAlignment = Alignment.CenterVertically
            ) {
                MarkdownText(
                    markdown = analytics,
                    modifier = Modifier.fillMaxWidth()
                )
            }
        }
    }
}