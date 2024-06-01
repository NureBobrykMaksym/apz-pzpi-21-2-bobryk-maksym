package com.example.area_pulse_mobile.model.User

import io.github.cdimascio.dotenv.dotenv
import io.ktor.client.*
import io.ktor.client.call.*
import io.ktor.client.request.*
import io.ktor.client.statement.*
import io.ktor.http.*
import kotlinx.serialization.json.*

class LoginException(message: String, cause: Throwable? = null) : Exception(message, cause)

interface UserApi {
    val client: HttpClient

    suspend fun  loginUser(email: String, password: String): UserResponse
    suspend fun getCurrentUser(token: String?): UserResponse
}

class UserApiImpl(override val client: HttpClient): UserApi {
    val dotenv = dotenv {
        directory = "./assets"
        ignoreIfMissing = false
        filename = "env"
    }

    private val apiKey: String = dotenv["API_URL"]

    override suspend fun loginUser(email: String, password: String): UserResponse {
        val requestBody = buildJsonObject {
            putJsonObject("user") {
                put("email", email)
                put("password", password)
            }
        }

        try {
            val response: HttpResponse = client.post("$apiKey/users/login") {
                contentType(ContentType.Application.Json)
                setBody(requestBody)
            }

            // 4. Handle Response
            if (response.status.isSuccess()) {
                // Successful Login
                return response.body<UserResponse>()
            } else {
                // Login Failure
                // Handle the specific error response from your server
                throw LoginException("Invalid credentials or other login failure")
            }
        } catch (e: Exception) {
            // 5. Error Handling
            // Handle network issues, JSON parsing errors, etc.
            throw LoginException("Error during login", e)
        }
    }

    override suspend fun getCurrentUser(token: String?): UserResponse {
        println("token $token")
        val response: HttpResponse = client.get("$apiKey/user") { // Replace with your actual endpoint
            headers {
                append(HttpHeaders.Authorization, "Bearer $token") // Example for authentication
                append(HttpHeaders.Accept, "application/json")             // Indicate desired response format
            }
        }
        println(response)
        return response.body()
    }
}
