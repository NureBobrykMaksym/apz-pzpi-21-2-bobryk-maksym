package com.example.area_pulse_mobile.repository

import com.example.area_pulse_mobile.model.User.UserApi
import com.example.area_pulse_mobile.model.User.UserResponse

interface UserRepository {
    suspend fun getCurrentUser(): UserResponse
}

class UserRepositoryImpl(private val userApi: UserApi) : UserRepository {

    override suspend fun getCurrentUser(): UserResponse {
        return try {
            println("user repository")
            userApi.getCurrentUser()
        } catch (e: Exception) {
            throw (e)
        }
    }
}