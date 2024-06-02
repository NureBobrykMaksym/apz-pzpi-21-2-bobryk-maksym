package com.example.area_pulse_mobile.model.Location

import io.ktor.client.HttpClient
import io.ktor.client.call.body
import io.ktor.client.request.*
import io.ktor.client.statement.HttpResponse
import io.github.cdimascio.dotenv.dotenv
import io.ktor.client.request.headers
import io.ktor.client.request.post
import io.ktor.client.statement.bodyAsText
import io.ktor.http.*
import kotlinx.serialization.json.*

interface LocationApi {
    val client: HttpClient

    suspend fun getLocations(token: String?): List<Location>
    suspend fun getLocationAnalytics(token: String?, locationId: Int): String
}

class LocationApiImpl(override val client: HttpClient) : LocationApi {
    val dotenv = dotenv {
        directory = "./assets"
        ignoreIfMissing = false
        filename = "env"
    }

    private val apiKey: String = dotenv["API_URL"]


    override suspend fun getLocations(token: String?): List<Location> {
        val response: HttpResponse = client.get("$apiKey/locations") {
            headers {
                append(HttpHeaders.Authorization, "Bearer $token") // Example for authentication
                append(HttpHeaders.Accept, "application/json")             // Indicate desired response format
            }
        }
        return response.body()
    }

    override suspend fun getLocationAnalytics(token: String?, locationId: Int): String {
        val requestBody = buildJsonObject {
            put("input", buildJsonObject {
                put("locationId", locationId)
            })
        }

        val response: HttpResponse = client.post("$apiKey/analytics") {
            contentType(ContentType.Application.Json) // Set content type for JSON data
            setBody(requestBody) // Set the request body

            headers {
                if (!token.isNullOrBlank()) { // Add authorization header if token is present
                    append(HttpHeaders.Authorization, "Bearer $token")
                }
                append(HttpHeaders.Accept, "application/json")
            }
        }

        return response.bodyAsText() // Assuming the response is a JSON string
    }
}