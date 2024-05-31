package com.example.area_pulse_mobile.model.User

import kotlinx.serialization.*

@Serializable
data class UserResponse(
    val user: User
)

@Serializable
data class User(
    val id: Int,
    val email: String,
    val username: String,
    val bio: String,
    val image: String,
    val token: String
)