package com.example.area_pulse_mobile.viewmodel

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.area_pulse_mobile.model.Todo.Todo
import com.example.area_pulse_mobile.model.User.UserResponse
import com.example.area_pulse_mobile.repository.TodoRepository
import com.example.area_pulse_mobile.repository.UserRepository
import kotlinx.coroutines.flow.MutableSharedFlow
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.SharedFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asSharedFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch

class UserViewModel(private val userRepository: UserRepository) : ViewModel() {

    private val _user = MutableStateFlow<UserResponse?>(null)
    val user: StateFlow<UserResponse?> = _user.asStateFlow() // Expose as read-only StateFlow

    private val _isLoading = MutableStateFlow(false)
    val isLoading: StateFlow<Boolean> = _isLoading.asStateFlow() // For showing loading indicator in UI

    private val _error = MutableSharedFlow<String>() // SharedFlow for one-time error events
    val error: SharedFlow<String> = _error.asSharedFlow()

    fun fetchUser() = viewModelScope.launch {
        try {
            println("getting user")
            _user.value = userRepository.getCurrentUser()
            println(_user.value)
        } catch (e: Exception) {
            _error.emit("Error fetching todos: ${e.message}")
        }
    }

    // ... Other methods for createTodo, updateTodo, deleteTodo in the future
}