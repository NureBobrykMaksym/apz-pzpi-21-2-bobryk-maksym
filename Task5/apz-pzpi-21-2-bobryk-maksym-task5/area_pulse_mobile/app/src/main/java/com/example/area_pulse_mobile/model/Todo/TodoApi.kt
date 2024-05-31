package com.example.area_pulse_mobile.model.Todo

import io.ktor.client.HttpClient
import io.ktor.client.call.body
import io.ktor.client.request.get
import io.ktor.client.statement.HttpResponse
import io.github.cdimascio.dotenv.dotenv

interface TodoApi {
    val client: HttpClient

    suspend fun getTodos(): List<Todo>
}

class TodoApiImpl(override val client: HttpClient) : TodoApi {
    val dotenv = dotenv {
        directory = "./assets"
        ignoreIfMissing = false
        filename = "env"
    }

    private val apiKey: String = dotenv["API_URL"]


    override suspend fun getTodos(): List<Todo> {
        return client.get("https://jsonplaceholder.typicode.com/todos").body()
    }
}