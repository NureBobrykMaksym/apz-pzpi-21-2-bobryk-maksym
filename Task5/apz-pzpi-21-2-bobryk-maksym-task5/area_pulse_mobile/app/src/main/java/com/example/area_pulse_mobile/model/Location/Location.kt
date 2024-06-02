package com.example.area_pulse_mobile.model.Location
import kotlinx.serialization.*

@Serializable
data class Location(
    val id: Int,
    val name: String,
    val description: String,
    val area: Int,
)