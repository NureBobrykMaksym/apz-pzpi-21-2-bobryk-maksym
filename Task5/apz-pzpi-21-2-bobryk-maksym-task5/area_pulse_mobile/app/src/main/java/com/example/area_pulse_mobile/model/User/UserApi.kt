package com.example.area_pulse_mobile.model.User

import com.example.area_pulse_mobile.network.HttpClientProvider.client
import io.github.cdimascio.dotenv.dotenv
import io.ktor.client.HttpClient
import io.ktor.client.call.body
import io.ktor.client.request.get
import io.ktor.client.request.headers
import io.ktor.client.statement.HttpResponse
import io.ktor.http.HttpHeaders

interface UserApi {
    val client: HttpClient

    suspend fun getCurrentUser(): UserResponse
}

class UserApiImpl(override val client: HttpClient): UserApi {
    val dotenv = dotenv {
        directory = "./assets"
        ignoreIfMissing = false
        filename = "env"
    }

    private val apiKey: String = dotenv["API_URL"]

    override suspend fun getCurrentUser(): UserResponse {
        val response: HttpResponse = client.get("$apiKey/user") { // Replace with your actual endpoint
            headers {
                append(HttpHeaders.Authorization, "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwidXNlcm5hbWUiOiJtYXhib2JyeWsuZGV2QGdtYWlsLmNvbSIsImVtYWlsIjoibWF4Ym9icnlrLmRldkBnbWFpbC5jb20iLCJpYXQiOjE3MTcxOTA3MzR9.w7myLNHfYkwi0xYh6sRN6J_CK6Taer7HGsGKpLLgUHs") // Example for authentication
                append(HttpHeaders.Accept, "application/json")             // Indicate desired response format
            }
        }
        println(response)
        return response.body()
    }
}
