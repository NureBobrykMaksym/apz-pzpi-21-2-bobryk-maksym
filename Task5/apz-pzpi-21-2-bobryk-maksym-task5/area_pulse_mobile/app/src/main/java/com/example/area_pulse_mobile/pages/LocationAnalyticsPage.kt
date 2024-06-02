package com.example.area_pulse_mobile.pages

import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import com.example.area_pulse_mobile.model.Location.Location
import com.example.area_pulse_mobile.viewmodel.LocationViewModel

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
                Text(
                    text = analytics,
                    style = MaterialTheme.typography.headlineMedium,
                    modifier = Modifier.weight(1f)
                )
            }
        }
    }
}