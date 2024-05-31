package com.example.area_pulse_mobile.repository

import com.example.area_pulse_mobile.model.Todo.Todo
import com.example.area_pulse_mobile.model.Todo.TodoApi

interface TodoRepository {
    suspend fun getTodos(): List<Todo>
    // Future methods for: createTodo, updateTodo, deleteTodo
}

class TodoRepositoryImpl(private val todoApi: TodoApi) : TodoRepository {

    override suspend fun getTodos(): List<Todo> {
        return try {
            todoApi.getTodos()
        } catch (e: Exception) {
            println(e)
            emptyList()
        }
    }

    // ... other methods (createTodo, updateTodo, deleteTodo) when needed
}