package com.example.area_pulse_mobile

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.material3.TopAppBar
import androidx.compose.runtime.Composable
import androidx.compose.runtime.collectAsState
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import com.example.area_pulse_mobile.model.Todo.Todo
import com.example.area_pulse_mobile.model.Todo.TodoApiImpl
import com.example.area_pulse_mobile.model.User.UserApiImpl
import com.example.area_pulse_mobile.repository.TodoRepositoryImpl
import com.example.area_pulse_mobile.repository.UserRepositoryImpl
import com.example.area_pulse_mobile.ui.theme.Area_pulse_mobileTheme
import com.example.area_pulse_mobile.viewmodel.TodoViewModel
import com.example.area_pulse_mobile.viewmodel.UserViewModel
import io.github.cdimascio.dotenv.dotenv
import io.ktor.client.HttpClient
import io.ktor.client.engine.cio.CIO
import io.ktor.client.plugins.contentnegotiation.ContentNegotiation
import io.ktor.serialization.kotlinx.json.json
import kotlinx.serialization.json.Json

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        val client = HttpClient(CIO) {
            install(ContentNegotiation) { json(Json { ignoreUnknownKeys = true }) }
        }

        val todoApi = TodoApiImpl(client)
        val todoRepository = TodoRepositoryImpl(todoApi)
        val todoViewModel = TodoViewModel(todoRepository)

        val userApi = UserApiImpl(client)
        val userRepository = UserRepositoryImpl(userApi)
        val userViewModel = UserViewModel(userRepository)

        enableEdgeToEdge()
        setContent {
            Area_pulse_mobileTheme {
                Scaffold(modifier = Modifier.fillMaxSize()) { innerPadding ->
                    Column(modifier = Modifier.padding(innerPadding)) { // Apply padding to the Column
                        UserInfo(viewModel = userViewModel)
//                        TodoScreen(viewModel = todoViewModel)
                    }
                }
            }
        }
    }
}

@Composable
fun TodoScreen(viewModel: TodoViewModel) {
    val todos = viewModel.todos.collectAsState()
    println(todos)
    println("hello")

    Scaffold { padding ->
        Column {
            // Custom Top Row (replacement for TopAppBar)
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