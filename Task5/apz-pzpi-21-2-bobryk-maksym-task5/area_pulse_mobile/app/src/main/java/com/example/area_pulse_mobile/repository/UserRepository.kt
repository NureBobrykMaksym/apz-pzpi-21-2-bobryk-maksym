package com.example.area_pulse_mobile.repository

import com.example.area_pulse_mobile.model.User.UserApi
import com.example.area_pulse_mobile.model.User.UserResponse

interface UserRepository {
    suspend fun loginUser(email: String, password: String): UserResponse
    suspend fun getCurrentUser(token: String?): UserResponse
}

class UserRepositoryImpl(private val userApi: UserApi) : UserRepository {
    override suspend fun loginUser(email: String, password: String): UserResponse {
        return userApi.loginUser(email, password)
    }

    override suspend fun getCurrentUser(token: String?): UserResponse {
        return try {
            println("user repository")
            userApi.getCurrentUser(token)
        } catch (e: Exception) {
            throw (e)
        }
    }
}