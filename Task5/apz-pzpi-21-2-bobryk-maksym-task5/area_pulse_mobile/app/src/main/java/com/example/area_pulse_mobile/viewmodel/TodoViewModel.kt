package com.example.area_pulse_mobile.viewmodel

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.area_pulse_mobile.model.Todo.Todo
import com.example.area_pulse_mobile.repository.TodoRepository
import kotlinx.coroutines.flow.*
import kotlinx.coroutines.launch

class TodoViewModel(private val todoRepository: TodoRepository) : ViewModel() {

    private val _todos = MutableStateFlow<List<Todo>>(emptyList())
    val todos: StateFlow<List<Todo>> = _todos.asStateFlow() // Expose as read-only StateFlow

    private val _isLoading = MutableStateFlow(false)
    val isLoading: StateFlow<Boolean> = _isLoading.asStateFlow() // For showing loading indicator in UI

    private val _error = MutableSharedFlow<String>() // SharedFlow for one-time error events
    val error: SharedFlow<String> = _error.asSharedFlow()

    init {
        fetchTodos()
    }

    fun fetchTodos() = viewModelScope.launch {
        try {
            _todos.value = todoRepository.getTodos()
        } catch (e: Exception) {
            _error.emit("Error fetching todos: ${e.message}") // Emit error message
        }
    }

    // ... Other methods for createTodo, updateTodo, deleteTodo in the future
}