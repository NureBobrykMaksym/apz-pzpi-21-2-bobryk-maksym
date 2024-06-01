package com.example.area_pulse_mobile

import android.content.Context
import android.content.SharedPreferences
import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.*
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.input.PasswordVisualTransformation
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.rememberNavController
import com.example.area_pulse_mobile.model.Todo.Todo
import com.example.area_pulse_mobile.model.Todo.TodoApiImpl
import com.example.area_pulse_mobile.model.User.UserApiImpl
import com.example.area_pulse_mobile.network.HttpClientProvider.client
import com.example.area_pulse_mobile.repository.TodoRepositoryImpl
import com.example.area_pulse_mobile.repository.UserRepositoryImpl
import com.example.area_pulse_mobile.ui.theme.Area_pulse_mobileTheme
import com.example.area_pulse_mobile.viewmodel.TodoViewModel
import com.example.area_pulse_mobile.viewmodel.UserViewModel


class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        val prefs = getSharedPreferences("jwt", Context.MODE_PRIVATE)

        enableEdgeToEdge()
        setContent {
            Area_pulse_mobileTheme {
                Scaffold(modifier = Modifier.fillMaxSize()) { innerPadding ->
                    Column(modifier = Modifier.padding(innerPadding)) {
                        App(prefs)
                    }
                }
            }
        }
    }
}

@Composable
fun App(prefs: SharedPreferences) {
    val todoApi = TodoApiImpl(client)
    val todoRepository = TodoRepositoryImpl(todoApi)
    val todoViewModel = TodoViewModel(todoRepository)

    val userApi = UserApiImpl(client)
    val userRepository = UserRepositoryImpl(userApi)
    val userViewModel = UserViewModel(userRepository, prefs)

    val navController = rememberNavController()

    NavHost(navController = navController, startDestination = "login_page") {
        composable("login_page") {
            LoginPage(viewModel = userViewModel, onLoginSuccess = { navController.navigate("user_info") })
        }
        composable("todo_list") {
            TodoScreen(viewModel = todoViewModel, onButtonClick = {
                navController.navigate("user_info")
            })
        }
        composable("user_info") {
            UserInfo(viewModel = userViewModel)
        }
    }
}

@Composable
fun TodoScreen(viewModel: TodoViewModel, onButtonClick: () -> Unit) {
    val todos = viewModel.todos.collectAsState()
    println(todos)
    println("hello")

    Scaffold { padding ->
        Column {
            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(16.dp),
                verticalAlignment = Alignment.CenterVertically // Center content
            ) {
                Text(
                    text = "Todo List",
                    style = MaterialTheme.typography.headlineMedium, // Title-like style
                    modifier = Modifier.weight(1f) // Push title to the left
                )
                Button(onClick = onButtonClick) {
                    Text(text = "Click to get user info")
                }
                // Add icons or buttons here if needed
                // Example:
                // Icon(imageVector = Icons.Filled.Add, contentDescription = "Add Todo")
            }

            // Todo List Content
            LazyColumn(contentPadding = padding) {
                items(todos.value.size) { index -> // Pass the size (number of items)
                    val todo = todos.value[index] // Get the todo at the current index
                    TodoItem(todo)
                }
            }
        }
    }
}

@Composable
fun TodoItem(todo: Todo) {
    Text(text = todo.title)
}

@Composable
fun UserInfo(viewModel: UserViewModel) {
    viewModel.fetchUser()
    val user = viewModel.user.collectAsState()


    user.value?.user?.let { Text(text = it.username) }
}

@Composable
fun LoginPage(viewModel: UserViewModel, onLoginSuccess: () -> Unit) {
    var email by remember { mutableStateOf("") }
    var password by remember { mutableStateOf("") }

    // State observation
    val user by viewModel.user.collectAsState()
    val isLoading by viewModel.isLoading.collectAsState()
    val error by viewModel.error.collectAsState(initial = null) // Initial null for errors

    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp),
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.Center
    ) {
        OutlinedTextField(
            value = email,
            onValueChange = { email = it },
            label = { Text("Email") },
            modifier = Modifier.fillMaxWidth()
        )

        Spacer(modifier = Modifier.height(8.dp))

        OutlinedTextField(
            value = password,
            onValueChange = { password = it },
            label = { Text("Password") },
            visualTransformation = PasswordVisualTransformation(),
            modifier = Modifier.fillMaxWidth()
        )

        Spacer(modifier = Modifier.height(16.dp))

        Button(
            onClick = { viewModel.loginUser(email, password) },
            enabled = email.isNotBlank() && password.isNotBlank() && !isLoading // Disable if loading
        ) {
            Text(if (isLoading) "Logging In..." else "Login")
        }

        // Error Handling
        error?.let {
            Spacer(modifier = Modifier.height(8.dp))
            Text(text = it, color = Color.Red)
        }

        // User logged in successfully
        LaunchedEffect(user) {
            if (user != null) {
                onLoginSuccess() // Navigate to the next screen
            }
        }
    }
}