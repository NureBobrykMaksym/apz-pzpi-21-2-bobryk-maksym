package com.example.area_pulse_mobile.model.Todo

import kotlinx.serialization.*

@Serializable
data class Todo(
    val userId: Int,
    val id: Int,
    val title: String,
    val completed: Boolean
)