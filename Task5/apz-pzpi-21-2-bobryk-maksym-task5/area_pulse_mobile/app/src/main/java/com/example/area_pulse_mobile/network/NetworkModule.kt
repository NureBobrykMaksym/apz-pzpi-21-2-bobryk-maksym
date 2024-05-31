package com.example.area_pulse_mobile.network

import com.example.area_pulse_mobile.model.Todo.*
import io.ktor.client.*
import io.ktor.client.engine.android.Android
import io.ktor.client.engine.cio.CIO
import io.ktor.client.plugins.contentnegotiation.*
import io.ktor.serialization.kotlinx.json.*
import kotlinx.serialization.json.Json
import io.ktor.client.plugins.logging.*

object HttpClientProvider {
    val client = HttpClient(CIO) {
        install(ContentNegotiation) {
            json(Json {
                // Customize JSON serialization options (if needed)
                prettyPrint = true
                isLenient = true

            })
        }
        install(Logging){
            level = LogLevel.ALL
            logger = Logger.DEFAULT
        }
    }
//    val todoApi: TodoApi = TodoApiImpl(client)
}